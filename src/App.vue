<template>
<div id="app">
  <Navigation v-on:next="next" v-on:previous="previous" />
  <CodePane :preface="preface" :code="code" v-on:show-prompt-output="showPromptOutput" />
  <PromptPane :prompt="prompt" />
</div>
</template>

<script>
import CodePane from './components/CodePane.vue'
import PromptPane from './components/PromptPane.vue'
import Navigation from './components/Navigation.vue'

export default {
  name: 'app',
  components: {
    CodePane,
    PromptPane,
    Navigation
  },
  data: function() {
    return {
      script: null,
      scenes: null,
      currentScene: null,
      preface: null,
      code: null,
      prompt: null
    };
  },
  created: function() {
    this.loadJSON('script.json', function(response, self) {
      self.script = JSON.parse(response);
      self.scenes = self.script.scenes;
      self.currentScene = self.scenes[0];
      self.loadCodePane();
    });
  },
  methods: {
    loadJSON: function(jsonPath, callback) {
      var xobj;
      xobj = new XMLHttpRequest;
      xobj.overrideMimeType('application/json');
      xobj.open('GET', jsonPath, true);
      var self = this;
      xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
          callback(xobj.responseText, self);
        }
      };
      return xobj.send(null);
    },
    next: function() {
      if (this.scenes !== null) {
        var currentScene = this.currentScene;
        var currentIndex = this.scenes.findIndex(function(scene) {
          return scene === currentScene;
        });
        if (currentIndex + 1 < this.scenes.length) {
          this.currentScene = this.scenes[currentIndex + 1];
          this.clearSceneData();
          this.loadCodePane();
        }
      }
    },
    previous: function() {
      if (this.scenes !== null) {
        var currentScene = this.currentScene;
        var currentIndex = this.scenes.findIndex(function(scene) {
          return scene === currentScene;
        });
        if (currentIndex - 1 >= 0) {
          this.currentScene = this.scenes[currentIndex - 1];
          this.clearSceneData();
          this.loadCodePane();
        }
      }
    },
    clearSceneData: function() {
      this.preface = null;
      this.code = null;
      this.prompt = null;
    },
    loadCodePane: function() {
      this.preface = this.currentScene.preface;
      this.code = this.currentScene.code;
    },
    showPromptOutput: function() {
      this.prompt = this.currentScene.prompt;
    }
  }
}
</script>

<style lang="less">
@import "./assets/global.less";
@import "./assets/variables.less";

#app {
    margin: 0;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    @media (min-width: 360px) {
        font-size: 16px;
    }
    @media (min-width: @tablet-min-width) {
        flex-direction: row;
    }
}
</style>

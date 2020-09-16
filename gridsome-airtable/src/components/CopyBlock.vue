<template>
  <div class="codeblock">
    <code>{{html}}</code>
    <button @click="doCopy(html)">{{button}}</button>
  </div>
</template>
<script>
export default {
  name: "codeBlock",
  props: {
    html: String,
    button: String
  },
  methods: {
    doCopy: function(text) {
      this.$copyText(text).then(
        function(e) {
          alert("Copied");
        },
        function(e) {
          alert("Can not copy");
          console.log(e);
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  position: relative;
  background: lightgrey;
  border-radius: 14px;
  padding: 1em 1em 2em 1em;

  margin-bottom: 1em;
}
code {
  -webkit-user-select: all; /* Chrome 49+ */
  -moz-user-select: all; /* Firefox 43+ */
  -ms-user-select: all; /* No support yet */
  user-select: all; /* Likely future */
  max-height: 7em;
  overflow: auto;
}
button {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5em 1em;
  border-bottom-right-radius: 14px;
  background: #ccc;
  cursor: pointer;
  border: 3px solid #fff;
  border-right-style: none;
  border-bottom-style: none;
  font-weight: bold;
}
</style>

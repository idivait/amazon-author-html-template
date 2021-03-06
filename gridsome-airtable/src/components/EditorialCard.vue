<template>
  <div
    class="editorial--card"
    :style="{
      border: '3px solid ' + color,
    }"
  >
    <h1 class="handwriting editorial--title">{{ editorial.author }}</h1>
    <time class="editorial--dates">{{
      formatDate(editorial.dateModified)
    }}</time>
    <!-- TODO: Figure out how to parse MD -->
    <div class="editorial--excerpt">
      <VueShowdown
        :key="mounted"
        ref="VueShowdown"
        :markdown="fullReview"
        flavor="github"
        :options="{ emoji: true }"
        :extensions="[removeWrappingParas, replaceQuote, replaceEls('em', 'i'), replaceEls('strong', 'b')]"
      />
    </div>
    <CopyBlock :key="mounted" :html="html" button="Copy HTML"/>
    <div class="link--moreDetails">
      <g-link :to="'/editorial/' + editorial.id + '/'"> Full Details >></g-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CopyBlock from "~/components/CopyBlock.vue";
export default {
  name: "editorialCard",
  props: {
    editorial: Object,
    color: String,
  },
  components: {
    CopyBlock
  },
  data() {
    return {
      html: 'Generating HTML...',
      removeWrappingParas: () => [{
        type: 'output',
        regex: /<p>(.+?)<\/p>/gsm,
        replace: '<br/>$1'
      }],
      replaceQuote: () => [{
        type: 'output',
        regex: /\"/gm,
        replace: '&quot;'
      }]
    }
  },
  mounted: function(){
    this.html = this.computedHtml;
  },
  computed: {
    fullReview: function() {
      const {review, author, title} = this.editorial;
      function pruneNs(text){
        return text.replace(/(\r\n|\n|\r)/gm,"")
      }
      return `<br/>"${pruneNs(review)}"\n-- *${pruneNs(author)}${title ? ` (${pruneNs(title)})`:``}*`
    },
    computedHtml: function() {
      if(!this.$refs.VueShowdown) return ``;
      const showdown = this.$refs.VueShowdown;
      let html = ""
      if(typeof showdown != undefined) {
          const converter = this.$refs.VueShowdown.converter;
          const review = this.$refs.VueShowdown.markdown;
          html = converter.makeHtml(review);
      }
      this.$attrs.pushEditorial(html, this.$attrs.index);
      return html;
    },
  },
  methods: {
      replaceEls: function(srcNode, replaceNode){
        if(typeof document !== 'undefined'){
          const doc = document;
            return [{
            type: 'output',
            filter: (text, converter, options)=>{
                let div = doc.createElement('div');
                div.innerHTML = text;

                let src = div.querySelectorAll(srcNode);
                src = [ ... src ]
                //reverse list so interior els go first
                src.reverse().forEach((node)=>{
                  let newNode = doc.createElement(replaceNode);
                  newNode.innerHTML = node.innerHTML;
                  node.replaceWith(newNode);
                });
                console.log("returns post-mount?");
                const markup = ``;

              return div.innerHTML;
            }
          }]
        } else {
            return [{
            type: 'output',
            filter: (text, converter, options)=>{
              return "converting text"
            }
          }]
        }

      },
    formatDate: function(date) {
      // TODO: Convert from moment to luxon
      const format = moment(date).format();
      return format;
    },
  },
};
</script>

<style lang="scss" scoped>
.editorial--title {
  margin: 0;
}

.editorial--date {
  margin: 0;
  color: hsl(0, 0%, 35%);
}

.link--moreDetails {
  display: block;
  padding-right: 25px;
  text-align: right;
}

.editorial--excerpt {
  /** This converts the `\n`'s into line breaks when *
  *   pulled from Airtable's Long text fields        */
  white-space: pre-wrap;
  margin-bottom: 2em;
}

.editorial--card {
  border-radius: 10px;
  padding: 7px;
  margin-bottom: 15px;
}

@media only screen and (min-width: 500px) {
  .editorial--card {
    padding: 12px 24px;
  }
}
</style>

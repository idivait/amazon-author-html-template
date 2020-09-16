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
    <p class="editorial--excerpt">
      <VueShowdown
        ref="VueShowdown"
        :markdown="fullReview"
        flavor="github"
        :options="{ emoji: true }"
        :extensions="[removeWrappingParas, replaceEls('strong','b'), replaceEls('em', 'i'), replaceQuote]"
      />
    </p>
    <CopyBlock :html="html" button="Copy HTML"/>
    <div class="link--moreDetails">
      <g-link :to="'editorial/' + editorial.id"> Full Details >></g-link>
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
      html: 'Example HTML',
      removeWrappingParas: () => [{
        type: 'output',
        regex: /<p>(.+?)<\/p>/gsm,
        replace: '<br/>$1'
      }],
      replaceEls: (srcNode, replaceNode)=> [{
        type: 'output',
        filter: (text, converter, options)=>{
            let div = document.createElement('div');
            div.innerHTML = text;

            let src = div.querySelectorAll(srcNode);
            src = [ ... src ]
            // reverse list so interior els go first
            src.reverse().forEach((node)=>{
              let newNode = document.createElement(replaceNode);
              newNode.innerHTML = node.innerHTML;
              node.replaceWith(newNode);
            });

          return div.innerHTML;
        }
      }],
      replaceQuote: () => [{
        type: 'output',
        regex: /\"/gm,
        replace: '&quot;'
      }]
    }
  },
  computed: {
    fullReview: function() {
      const {review, author, title} = this.editorial;
      function pruneNs(text){
        return text.replace(/(\r\n|\n|\r)/gm,"")
      }
      return `<br/>"${pruneNs(review)}"\n-- *${pruneNs(author)}${title ? ` (${pruneNs(title)})`:``}*`
    }
  },
  mounted() {
    const showdown = this.$refs.VueShowdown;
    let html = ""
    if(typeof showdown != undefined) {
      const converter = this.$refs.VueShowdown.converter;
      const review = this.$refs.VueShowdown.markdown;
      html = converter.makeHtml(review);
    }
    this.$attrs.pushEditorial(html);
    this.html = html;
  },
  methods: {
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

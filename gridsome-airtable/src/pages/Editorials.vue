<template>
  <!-- This is the Events list Page-->
  <Layout>
    <h2>Copy Kindle Editorials</h2>
    <CopyBlock :html="kindle" button="Copy HTML" />
    <h2>Copy Paperback Editorials</h2>
    <p>Why is one character limited and the other is not? Who fucking knows.</P>
    <div v-for="(block, index) in paperback" :key="index">
      <CopyBlock :html="block" button="Copy HTML" />
    </div>
    <h2>Individual Editorials</h2>
    <div v-for="(edge, index) in $page.editorials.edges" :key="edge.node.id">
      <EditorialCard
        :editorial="edge.node"
        :color="hrColors[index % hrColors.length]"
        :index="index"
        :pushEditorial="pushEditorial"
      />
    </div>
  </Layout>
</template>

<page-query>
  query Editorials {
    editorials: allEditorial (sort: { order: ASC }){
      edges {
        node{
          id
          author
          title
          review
          status
          dateCreated
          dateModified
        }
      }
    }
  }
</page-query>
<script>
import Layout from "~/layouts/Default.vue";
import EditorialCard from "~/components/EditorialCard.vue";
import CopyBlock from "~/components/CopyBlock.vue";
export default {
  components: {
    Layout,
    CopyBlock,
    EditorialCard,
  },
  data() {
    return {
      hrColors: [
        "#FCB400", // Airtable Yellow
        "#18BFFF", // Airtable Blue
        "#D92654", // Airtable Red
      ],
      editorials: [],
      prefix:"<br><br>"
    };
  },
  computed: {
    paperback: function() {
      const html = this.editorials.reduce((result, cur, i, array)=>{
        const lastBlock = result[result.length -1];
        // console.log(lastBlock);
        const tooLong = lastBlock && lastBlock.length + cur.length > 4000;
        if(lastBlock && !tooLong) {
          result[result.length -1] = `${lastBlock}${cur}`;
          console.log(result);
        } else {
          result.push(cur);
        }
        return result;
      }, []);
      return html.map(block=>block.slice(this.prefix.length));
    },
    kindle: function() {
      return this.paperback.join(this.prefix)
    }
  },
  methods: {
    pushEditorial: function(editorial) {
      this.editorials.push(editorial);
    },
  },
};
</script>
<style lang="scss" scoped></style>

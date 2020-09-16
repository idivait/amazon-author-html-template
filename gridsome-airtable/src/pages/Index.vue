<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image
      alt="Amazon Author Page Interface"
      src="~/assets/reviewPage.png"
      width="400"
      class="headerImage"
    />
    <section>
      <h1 class="handwriting">How to Use</h1>
      <ol>
        <li>
          Go to the <g-link to="/editorials/">Editorials</g-link> page to get
          started.
        </li>
      </ol>
    </section>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Amazon Author Page HTML Export",
  },
};
</script>

<style>
.headerImage {
  border: 4px solid hsl(43, 100%, 49%);
  border-radius: 15px;
  margin: 0 auto;
  display: block;
  padding: 4px;
  max-width: 100%;
}

section > h1 {
  font-size: 2.6rem;
}
</style>

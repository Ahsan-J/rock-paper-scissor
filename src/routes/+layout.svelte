<script>
    import Footer from "$lib/footer.svelte";
import Header from "$lib/header.svelte";
    import "../app.css";
</script>

<main>
    <Header />
    <slot />
    <Footer />
</main>

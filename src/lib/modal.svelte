<script lang="ts">
    export let show: boolean = false;
</script>

<dialog open={show} class="bg-dark bg-opacity-20 h-full w-full max-w-full max-h-full m-auto">
    <div class="bg-light min-h-[25%] max-h-[80%] min-w-[25%] max-w-[25%] rounded-lg shadow-lg flex justify-center items-center mx-auto mt-40">
        <slot />
    </div>
</dialog>
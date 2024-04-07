<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    const countdownText = ['Rock', 'Paper', 'Scissors', 'Shoot'];
    export let onAnimationComplete: () => void = ()=>{};

    let activeIndex = 0;
    let intervalTimeout = 0;

    const _onAnimationComplete = () => {
        clearInterval(intervalTimeout);
        if(onAnimationComplete) onAnimationComplete();
    }

    onMount(() => {
        intervalTimeout = setInterval(() => {
            activeIndex++;
            if(countdownText.length < activeIndex) _onAnimationComplete();
        }, 700);
    });

    onDestroy(() => {
        clearInterval(intervalTimeout);
    });
</script>

<div class="flex justify-center items-center h-full">
    {#each countdownText as text, index}
        <h3 class="text-light text-[0] font-medium transition-all duration-500" class:text-success={index == countdownText.length - 1} class:text-3xl={activeIndex == index} class:md:text-5xl={activeIndex == index} class:lg:text-7xl={activeIndex == index}>{text}</h3>
    {/each}
</div>
<script lang="ts" >
    import { onDestroy } from "svelte";
    const moves = {
        "paper": "🖐️",
        "scissor": "✌️",
        "rock": "✊",
    };

    $: cpuRandomIndex = getRandomizeIndex();
    $: playerRandomIndex = getRandomizeIndex();

    let radomGeneratorInterval = setInterval(() => {
        cpuRandomIndex = getRandomizeIndex();
        playerRandomIndex = getRandomizeIndex();
    }, 300);

    function getRandomizeIndex(): keyof typeof moves {
        const keys = Object.keys(moves) as Array<keyof typeof moves>;
        const randomIndex = Math.floor(Math.random() * keys.length);
        return keys[randomIndex];    
    }

    onDestroy(() => {
        clearInterval(radomGeneratorInterval);
    })
</script>

<div class="flex flex-col h-3/4 w-1/2 justify-between">
    <div class="flex-[0.3] bg-light rounded-lg shadow-lg flex flex-col">
        <div class="flex flex-row items-center justify-center gap-6">
            <h4 class="font-normal text-3xl">Ahsan</h4>
            <span class="font-light text-xl">VS</span>
            <h4 class="font-normal text-3xl">CPU</h4>
        </div>
    </div>
    <div class="flex flex-row flex-[0.55] justify-between items-center">
        <div class="h-80 w-80 bg-light rounded-lg shadow-lg flex justify-center items-center">
            <span class="text-8xl font-extralight rotate-45">{moves[playerRandomIndex]}</span>
        </div>
        <div class="h-80 w-80 bg-light rounded-lg shadow-lg flex justify-center items-center">
            <span class="text-8xl font-extralight -rotate-45">{moves[cpuRandomIndex]}</span>
        </div>
    </div>
    <div class="flex flex-row gap-4 justify-center items-center">
        <button class="bg-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">Rock</button>
        <button class="bg-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">Paper</button>
        <button class="bg-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">Scissor</button>
    </div>
</div>

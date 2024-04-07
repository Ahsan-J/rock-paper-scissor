<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { Result } from "../constant/app";
    import Countdown from "$lib/countdown.svelte";
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';

    $: playerName = "";

    let results: Array<Result> = [];
    let currentResult: Result | null;

    const moves = {
        paper: "🖐️",
        scissor: "✌️",
        rock: "✊",
    };

    const moveKeys: Array<keyof typeof moves> = Object.keys(moves) as Array<keyof typeof moves>;

    $: cpuRandomIndex = 0;
    $: playerRandomIndex = 0;
    let showCountdown = false;
    let selectedMove: keyof typeof moves;

    const generateRandomInterval = () => {
        return setInterval(() => {
            cpuRandomIndex = (cpuRandomIndex + 1) % moveKeys.length;
            playerRandomIndex = (playerRandomIndex + 1) % moveKeys.length;
        }, 250)
    }

    let radomGeneratorInterval = generateRandomInterval();

    const onSubmitPlayerName = (e: Event) => {
        if (e.target instanceof HTMLFormElement) {
            e.preventDefault();
            const formData = new FormData(e.target);
            goto(`${base}/?name=${formData.get("name") as string}`) 
        }
    };

    const onSelectMove = (move: keyof typeof moves) => {
        selectedMove = move;
        showCountdown = true;
    };

    const generateResultOutput = ( playerMoveIndex: number, cpuMoveIndex: number ): Result | null => {
        if (playerMoveIndex > moveKeys.length) return null; /* console.error("Invalid Player move"); */
        if (cpuMoveIndex > moveKeys.length) return null; /* console.error("Invalid CPU move"); */

        const playerMove = moveKeys[playerMoveIndex];
        const cpuMove = moveKeys[cpuMoveIndex];

        if (playerMove == cpuMove) return Result.Draw;
        if (playerMove == "rock" && cpuMove == "paper") return Result.CPU;
        if (playerMove == "rock" && cpuMove == "scissor") return Result.Player;
        if (playerMove == "paper" && cpuMove == "scissor") return Result.CPU;
        if (playerMove == "paper" && cpuMove == "rock") return Result.Player;
        if (playerMove == "scissor" && cpuMove == "rock") return Result.CPU;
        if (playerMove == "scissor" && cpuMove == "paper") return Result.Player;
        return null;
    };

    const onAnimationComplete = () => {
        clearInterval(radomGeneratorInterval);
        playerRandomIndex = moveKeys.indexOf(selectedMove);
        cpuRandomIndex = Math.floor(Math.random() * moveKeys.length);
        currentResult = generateResultOutput(playerRandomIndex, cpuRandomIndex);
        if (currentResult) results = [...results, currentResult];
        showCountdown = false;
    }

    const onNextMatch = () => {
        radomGeneratorInterval = generateRandomInterval();
        currentResult = null;
    }

    onMount(() => {
        const _name = $page.url.searchParams.get('name');
        if(_name) {
            playerName = _name;
        }
    })
    
    onDestroy(() => {
        clearInterval(radomGeneratorInterval);
    });
</script>

{#if !!playerName}
    <div class="flex flex-col h-3/4 w-11/12 lg:w-1/2 md:w-3/4 justify-between">
        <div class="flex-[0.2] lg:flex-[0.3] md:flex-[0.25] bg-light rounded-lg shadow-lg flex flex-col">
            <div class="flex flex-row items-center justify-around gap-6 h-full">
                <div class="flex flex-col justify-center items-center">
                    <h4 class="font-normal text-xl lg:text-3xl md:text-2xl">{playerName}</h4>
                    <span class="font-medium text-xl lg:text-3xl md:text-2xl">
                        {results.filter((v) => v == Result.Player).length}
                    </span>
                </div>
                <span class="font-light text-xl">VS</span>
                <div class="flex flex-col justify-center items-center">
                    <h4 class="font-normal text-xl lg:text-3xl md:text-2xl">CPU</h4>
                    <span class="font-medium text-xl lg:text-3xl md:text-2xl">
                        {results.filter((v) => v == Result.CPU).length}
                    </span>
                </div>
            </div>
            <div class="flex flex-row justify-center items-center gap-6 m-2">
                <h4 class="font-normal text-xl lg:text-3xl md:text-2xl">Draw</h4>
                <span class="font-medium text-xl lg:text-3xl md:text-2xl">
                    {results.filter((v) => v == Result.Draw).length}
                </span>
            </div>
        </div>
        <div class="h-12 md:h-16 lg:h-20">
            {#if showCountdown}
                <Countdown onAnimationComplete={onAnimationComplete} />
            {/if}
        </div>
        <div class="flex flex-row flex-[0.55] justify-between items-center">
            <div class="h-40 w-40 xl:h-80 xl:w-80 lg:h-72 lg:w-72 md:h-60 md:w-60 bg-light rounded-lg shadow-lg flex justify-center items-center border-4" class:border-success={currentResult == Result.Player} class:border-danger={currentResult == Result.CPU} class:border-warning={currentResult == Result.Draw}>
                <span class="text-5xl lg:text-8xl md:text-6xl font-extralight rotate-45">
                    {moves[moveKeys[playerRandomIndex]]}
                </span>
            </div>
            <div class="h-40 w-40 xl:h-80 xl:w-80 lg:h-72 lg:w-72 md:h-60 md:w-60 bg-light rounded-lg shadow-lg flex justify-center items-center border-4" class:border-success={currentResult == Result.CPU} class:border-danger={currentResult == Result.Player} class:border-warning={currentResult == Result.Draw}>
                <span class="text-5xl lg:text-8xl md:text-6xl font-extralight -rotate-45">
                    {moves[moveKeys[cpuRandomIndex]]}
                </span>
            </div>
        </div>
        <div class="flex flex-row gap-4 justify-center items-center">
            {#if currentResult}
            <button 
                on:click={onNextMatch} 
                class="bg-primary text-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">
                Next Match
            </button>
            {:else}
            <button 
                on:click={() => onSelectMove("rock")} 
                disabled={showCountdown}
                class="bg-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">
                Rock
            </button>
            <button
                on:click={() => onSelectMove("paper")}
                disabled={showCountdown}
                class="bg-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">
                Paper
            </button>
            <button
                on:click={() => onSelectMove("scissor")}
                disabled={showCountdown}
                class="bg-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">
                Scissor
            </button>
            {/if}
        </div>
    </div>
{:else}
<form class="flex flex-col m-4 gap-2 w-96 bg-white p-8 rounded-lg shadow-lg" on:submit={onSubmitPlayerName}>
        <label for="name">Enter your name:</label>
        <input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            class="w-full py-2 pl-2 rounded transition-all text-ellipsis border outline-none border-dark border-opacity-20 hover:border-primary hover:border-opacity-80"
        />
        <button
            type="submit"
            class="bg-primary my-2 text-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">
            Begin Match
        </button>
    </form>
{/if}
<script lang="ts" >
    import { onDestroy, onMount } from "svelte";

    $: playerName = "";

    const enum Result {
        Player = "Player",
        CPU = "CPU",
        Draw = "Draw",
    };

    let results: Array<Result> = [];

    const moves = {
        "paper": "🖐️",
        "scissor": "✌️",
        "rock": "✊",
    };

    const moveKeys: Array<keyof typeof moves> = Object.keys(moves) as Array<keyof typeof moves>;

    $: cpuRandomIndex = 0;
    $: playerRandomIndex = 0;

    let radomGeneratorInterval = setInterval(() => {
        cpuRandomIndex = (cpuRandomIndex + 1) % moveKeys.length;
        playerRandomIndex = (playerRandomIndex + 1) % moveKeys.length;
    }, 250);

    const onSubmitPlayerName = (e: Event) => {
        if(e.target instanceof HTMLFormElement) {
            e.preventDefault()
            const formData = new FormData(e.target);
            playerName = formData.get('name') as string;
            const modal = document.querySelector<HTMLDialogElement>('[data-modal]');
            modal?.close();
            console.log(modal, playerName)
        }
    }

    const onSelectMove = (move: keyof typeof moves) => {
        clearInterval(radomGeneratorInterval);
        playerRandomIndex = moveKeys.indexOf(move);
        cpuRandomIndex =  Math.floor(Math.random() * moveKeys.length);
        const result = generateResultOutput(playerRandomIndex, cpuRandomIndex);
        if(result) results = [...results, result];
    } 

    const generateResultOutput = (playerMoveIndex: number, cpuMoveIndex: number): Result | void => {
        if(playerMoveIndex > moveKeys.length) return console.error("Invalid Player move");
        if(cpuMoveIndex > moveKeys.length) return console.error("Invalid CPU move");

        const playerMove = moveKeys[playerMoveIndex];
        const cpuMove = moveKeys[cpuMoveIndex];

        if(playerMove == cpuMove) return Result.Draw;
        if(playerMove == "rock" && cpuMove == "paper") return Result.CPU;
        if(playerMove == "rock" && cpuMove == "scissor") return Result.Player;
        if(playerMove == "paper" && cpuMove == "scissor") return Result.CPU;
        if(playerMove == "paper" && cpuMove == "rock") return Result.Player;
        if(playerMove == "scissor" && cpuMove == "rock") return Result.CPU;
        if(playerMove == "scissor" && cpuMove == "paper") return Result.Player;
    }

    onDestroy(() => {
        clearInterval(radomGeneratorInterval);
    })
</script>

{#if !!playerName}
<div class="flex flex-col h-3/4 w-1/2 justify-between">
    <div class="flex-[0.3] bg-light rounded-lg shadow-lg flex flex-col">
        <div class="flex flex-row items-center justify-around gap-6 h-full">
            <div class="flex flex-col justify-center items-center">
                <h4 class="font-normal text-3xl">{playerName}</h4>
                <span class="font-medium text-3xl">{results.filter(v => v == Result.Player).length}</span>
            </div>
            <span class="font-light text-xl">VS</span>
            <div class="flex flex-col justify-center items-center">
                <h4 class="font-normal text-3xl">CPU</h4>
                <span class="font-medium text-3xl">{results.filter(v => v == Result.CPU).length}</span>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center gap-6 m-2">
            <h4 class="font-normal text-3xl">Draw</h4>
            <span class="font-medium text-3xl">{results.filter(v => v == Result.Draw).length}</span>
        </div>
    </div>
    <div class="flex flex-row flex-[0.55] justify-between items-center">
        <div class="h-80 w-80 bg-light rounded-lg shadow-lg flex justify-center items-center">
            <span class="text-8xl font-extralight rotate-45">{moves[moveKeys[playerRandomIndex]]}</span>
        </div>
        <div class="h-80 w-80 bg-light rounded-lg shadow-lg flex justify-center items-center">
            <span class="text-8xl font-extralight -rotate-45">{moves[moveKeys[cpuRandomIndex]]}</span>
        </div>
    </div>
    <div class="flex flex-row gap-4 justify-center items-center">
        <button on:click={() => onSelectMove('rock')} class="bg-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">Rock</button>
        <button on:click={() => onSelectMove('paper')} class="bg-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">Paper</button>
        <button on:click={() => onSelectMove('scissor')} class="bg-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">Scissor</button>
    </div>
</div>
{/if}

<dialog open={!playerName} class="bg-dark bg-opacity-20 h-full w-full max-w-full max-h-full m-auto">
    <div class="bg-light min-h-[25%] max-h-[80%] min-w-[25%] max-w-[25%] rounded-lg shadow-lg flex justify-center items-center mx-auto mt-40">
        <form class="flex flex-col m-4 gap-2 w-full" on:submit={onSubmitPlayerName}>
            <label for="name">Enter your name:</label>
            <input id="name" type="text" name="name" placeholder="John Doe" class="w-full py-2 pl-2 rounded transition-all text-ellipsis border outline-none border-dark border-opacity-20 hover:border-primary hover:border-opacity-80"/>
            <button type="submit" class="bg-primary my-2 text-light font-medium hover:bg-opacity-90 active:bg-opacity-75 px-4 py-2 rounded-lg shadow-lg transition-all duration-150">Begin Match</button>
        </form>
    </div>
</dialog>

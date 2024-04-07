<script lang="ts">
    type MenuType = {
        label: string,
        link: string
    }
    const menu: Array<MenuType> = [
        {
            label: "Blogs",
            link: "https://ahsan-j.github.io/blogs",
        }
    ]
</script>

<header class={`fixed top-0 w-full z-50`}>
    <nav class="relative flex-wrap bg-light text-dark flex flex-row justify-center items-center py-4">
        <div class="flex flex-row justify-between w-full lg:w-3/4 items-baseline md:items-center px-2">
            <div class="flex flex-row justify-start items-center">
                <div class='flex flex-row justify-start items-center gap-1'>
                    <a class="text-xl text-primary font-medium whitespace-nowrap md:mr-4 no-underline" href="https://ahsan-j.github.io/">Ahsan Ahmed</a>
                </div>
                <ul class="flex flex-row items-center basis-auto ml-2 md:m-0 p-0 list-none gap-2">
                    {#each menu as item} 
                        <li class="mx-0.5">
                            <a class="p-1 text-dark no-underline" href={item.link || "#"}>{item.label}</a>
                        </li>
                    {/each}
                </ul>
            </div>
            <div class='flex flex-row justify-between gap-2'>
                <a href="https://github.com/Ahsan-J">
                    <img class="w-8 h-8" src="/github.svg" alt="Github"/>
                </a>
                <a href="https://linkedin.com/in/ahsan-j">
                    <img class="w-8 h-8" src="/linkedin.svg" alt="Linkedin"/>
                </a>
            </div>
        </div>
    </nav>
</header>
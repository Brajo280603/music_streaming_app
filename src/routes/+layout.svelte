<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Player from "$lib/Player.svelte"

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<div class="fixed bottom-0 w-full">
	<Player></Player>
</div>


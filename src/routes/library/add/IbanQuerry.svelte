<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode';
	import type { QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
	import { onMount } from 'svelte';

	let scanning = false;
	let QR: Html5Qrcode;

	onMount(init);

	function init() {
		QR = new Html5Qrcode('reader');
	}

	function start() {
		QR.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	async function stop() {
		await QR.stop();
		scanning = false;
	}

	const onScanSuccess: QrcodeSuccessCallback = (decodedText, decodedResult) => {
		alert(`Code matched = ${decodedText}`);
		console.log(decodedResult);
	};
	const onScanFailure: QrcodeErrorCallback = (error) => {
		console.warn(`Code scan error = ${error}`);
	};
</script>

<main>
	<reader id="reader" />
	{#if scanning}
		<button on:click={stop}>stop</button>
	{:else}
		<button on:click={start}>start</button>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
	reader {
		width: 100%;
		min-height: 500px;
		background-color: black;
	}
</style>

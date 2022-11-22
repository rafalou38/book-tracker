<script lang="ts">
	import MdIcon from '$lib/components/MdIcon.svelte';
	import {
		Block,
		BlockTitle,
		Button,
		Fab,
		Link,
		ListButton,
		ListInput,
		Sheet,
		Toolbar
	} from '@rafaelmc-dev/konsta/svelte';
	import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
	import type { QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
	import { onMount } from 'svelte';

	let scanning = false;
	let QR: Html5Qrcode;
	export let isbn = '';

	onMount(init);

	function init() {
		QR = new Html5Qrcode('reader', {
			formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
			verbose: true,
			experimentalFeatures: {},
			useBarCodeDetectorIfSupported: false
		});
	}

	function start() {
		QR.start({ facingMode: 'environment' }, { fps: 10, qrbox: 250 }, onScanSuccess, onScanFailure);
		scanning = true;
	}

	async function stop() {
		await QR.stop();
		scanning = false;
	}

	const onScanSuccess: QrcodeSuccessCallback = (decodedText, decodedResult) => {
		// alert(`Code matched = ${decodedText}`);
		// console.log(decodedResult);
		isbn = decodedText;
		stop();
	};
	const onScanFailure: QrcodeErrorCallback = (error) => {
		console.warn(`Code scan error = ${error}`);
	};
</script>

<!-- <BlockTitle>Search by ISBN</BlockTitle>
<Block strong outlineIos class="space-y-2">
	<div class="max-w-md list-none ">
		<ListInput
			label="ISBN"
			placeholder="enter your ISBN"
			type="text"
			outline
			class="input"
			minlength="10"
			maxlength="13"
			value={isbn}
		/>
	</div>
</Block> -->

<Fab
	class="fixed left-1/2 bottom-4-safe transform -translate-x-1/2 z-20 w-64 justify-between"
	text="Scan"
	textPosition="after"
	onClick={start}
>
	<i slot="icon" class="block material-symbols-fill">barcode_scanner</i>
	<span />
</Fab>

<Sheet class="pb-safe w-screen" opened={scanning} onBackdropClick={stop}>
	<Toolbar top>
		<div class="left" />
		<div class="right">
			<Link toolbar onClick={stop}>Cancel</Link>
		</div>
	</Toolbar>
	<Block>
		<reader id="reader" />
	</Block>
</Sheet>

<!-- Popup ou sheet modal -->
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
		min-height: 300px;
		background-color: rgb(36, 36, 36);
		display: block;
	}
	:global(.text-icon-material) {
		@apply mr-2;
	}
</style>

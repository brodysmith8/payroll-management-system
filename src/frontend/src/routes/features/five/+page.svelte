<script>
	import { onMount } from "svelte";
	import { apiData } from './store.js'; // what is this for? 
	import { CodeBlock } from '@skeletonlabs/skeleton';
	
	onMount(async() => {
		fetch('apilink')
			.then(response => response.json())
			.then(data => {
				console.log(data); 
				apiData.set(data);
			}).catch(error => {
				console.log(error);
				return [];
			});
	});
</script>
<svelte:head>
    <title>Feature Five</title>
</svelte:head>

<body class="bg-gray-100 font-sans leading-normal tracking-normal">

	<nav id="header" class="fixed w-full z-10 top-0">

		<div id="progress" class="h-1 z-20 top-0"></div>

		<div class="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-5 py-3">

			<div class="mx-auto">
				<a class="text-gray-900 text-4xl no-underline hover:no-underline font-extrabold md:text-4xl small-caps" href="/">
					Regent Park Payroll
				</a>
			</div>

			<div class="block lg:hidden pr-4">
				<button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-green-500 appearance-none focus:outline-none">
					<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
		</div>
	</nav>

	<!--Container-->
	<div class="container w-full md:max-w-3xl mx-auto pt-20 pb-20">

		<div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">

			<!--Title-->
			<div class="font-sans">
				<p class="text-base md:text-sm text-green-500 font-bold text-center"><a href="/" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">&lt; BACK</a></p>
						<h1 class="font-bold font-sans break-normal text-gray-900 pt-6 text-3xl -mb-0.5 md:text-4xl">Feature Five</h1>
						<p class="text-sm md:text-base font-normal text-gray-600 pb-3"><strong class="small-caps text-gray-900">Modification + Query:</strong> delete the branch with the lowest employee count</p>
			</div>


			
			<div class="code-block">
				<CodeBlock class="p-4" language="sql" background='bg-[#141517]' text='text-sm' rounded='rounded-container-token' code={`
DELETE FROM Branch
WHERE branch_id = (
	SELECT branch_id
	FROM (
		SELECT branch_id,
			COUNT(branch_id) AS num_employees
		FROM Employee
		GROUP BY branch_id
		ORDER BY num_employees ASC
		LIMIT 1
	) AS branch_id_to_delete
);`}></CodeBlock>
</div>

<div class="w-full font-sans mx-auto p-1 pr-0 pl-0 flex flex-wrap items-center">
    <button type="submit" class="flex-1 mt-2 block md:inline-block appearance-none bg-green-500 text-white text-base font-bold tracking-wider py-4 rounded shadow hover:bg-green-400">GO</button>
    <div class='flex-none w-5'></div>
    <button type="submit" class="flex-1 mt-2 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400">VALIDATE</button>
</div>

<div class="font-sans text-center">
    <p class="text-xl small-caps font-bold text-gray-900 mt-6">Query Result</p>
</div>
<table class="w-full table-auto font-sans md:text-base border-collapse border border-slate-500 mt-1">
    <thead class="bg-green-500 text-white">
      <tr>
        <th class="border border-slate-600">Song</th>
        <th class="border border-slate-600">Artist</th>
        <th class="border border-slate-600">Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-slate-700">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
        <td class="border border-slate-700">Malcolm Lockyer</td>
        <td class="border border-slate-700">1961</td>
      </tr>
      <tr>
        <td class="border border-slate-700">Witchy Woman</td>
        <td class="border border-slate-700">The Eagles</td>
        <td class="border border-slate-700">1972</td>
      </tr>
      <tr>
        <td class="border border-slate-700">Shining Star</td>
        <td class="border border-slate-700">Earth, Wind, and Fire</td>
        <td class="border border-slate-700">1975</td>
      </tr>
    </tbody>
  </table>

  <div class="font-sans text-center">
    <p class="text-xl small-caps font-bold text-gray-900 mt-6">Validation Result</p>
</div>
<table class="w-full table-auto font-sans md:text-base border-collapse border border-slate-500 mt-1">
    <thead class="bg-green-500 text-white">
      <tr>
        <th class="border border-slate-600">Song</th>
        <th class="border border-slate-600">Artist</th>
        <th class="border border-slate-600">Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-slate-700">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
        <td class="border border-slate-700">Malcolm Lockyer</td>
        <td class="border border-slate-700">1961</td>
      </tr>
      <tr>
        <td class="border border-slate-700">Witchy Woman</td>
        <td class="border border-slate-700">The Eagles</td>
        <td class="border border-slate-700">1972</td>
      </tr>
      <tr>
        <td class="border border-slate-700">Shining Star</td>
        <td class="border border-slate-700">Earth, Wind, and Fire</td>
        <td class="border border-slate-700">1975</td>
      </tr>
    </tbody>
  </table>
			<!--/ Post Content-->

		</div>

		<!--/Next & Prev Links-->

	</div>
	<!--/container-->

	<footer class="bg-white border-t border-gray-400 shadow">
		<div class="container max-w-4xl mx-auto flex py-8">

			<div class="w-full mx-auto flex flex-wrap">
				<div class="flex w-full md:w-1/2 mx-auto text-center">
					<div class="px-8">
						<h3 class="font-bold text-gray-900">Regent Park Enterprises, Inc. (c) 2022</h3>
					</div>
				</div>
			</div>



		</div>
	</footer>

	<script>
		/* Progress bar */
		//Source: https://alligator.io/js/progress-bar-javascript-css-variables/
		var h = document.documentElement,
			b = document.body,
			st = 'scrollTop',
			sh = 'scrollHeight',
			progress = document.querySelector('#progress'),
			scroll;
		var scrollpos = window.scrollY;
		var header = document.getElementById("header");
		var navcontent = document.getElementById("nav-content");

		document.addEventListener('scroll', function() {

			/*Refresh scroll % width*/
			scroll = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
			progress.style.setProperty('--scroll', scroll + '%');

			/*Apply classes for slide in bar*/
			scrollpos = window.scrollY;

			if (scrollpos > 10) {
				header.classList.add("bg-white");
				header.classList.add("shadow");
				navcontent.classList.remove("bg-gray-100");
				navcontent.classList.add("bg-white");
			} else {
				header.classList.remove("bg-white");
				header.classList.remove("shadow");
				navcontent.classList.remove("bg-white");
				navcontent.classList.add("bg-gray-100");

			}

		});


		//Javascript to toggle the menu
		document.getElementById('nav-toggle').onclick = function() {
			document.getElementById("nav-content").classList.toggle("hidden");
		}
	</script>

</body>
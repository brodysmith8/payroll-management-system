<script>
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import SvelteTable from "svelte-table";

	let sortBy = "num_employees";
  	let sortOrder = 1;
	let rSelectedCols = ["branch_id", "num_employees"];
	let vSelectedCols = ["branch_id", "num_employees"];
	let nSelectedCols = ["total_number_of_employees", "total_number_of_branches"];

	let rData = null;
	let rState = false;
	let vData = null;
	let vState = false;
	let nRData = new Object();
	let nVData = new Object();

	let rLoadingState = false;
	

	let data = null;

	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

	let dotz = ".";
	function addDotz() {
		if (dotz === "...") {
			return dotz = ".";
		} else {
			dotz += ".";
			return dotz;
		}
	}

	async function loadWait() {
		while(true) {
			addDotz();
			await delay(500);
		}
	}

	async function getQuery () {
		rLoadingState = true;
		const res = await fetch('http://localhost:3000/api/branch/lowest-employee-count', {
			method: 'DELETE',
			mode: 'cors',
		});
		data = await res.json();

		rData = data.before;
		nRData.total_number_of_employees = rData[1][0].total_number_of_employees;
		nRData.total_number_of_branches = rData[2][0].total_number_of_branches;
		rState = true;
		rLoadingState = false;
	}

	async function getValidation () {
		if (rState) {
			vData = data.after;
			nVData.total_number_of_employees = vData[1][0].total_number_of_employees;
			nVData.total_number_of_branches = vData[2][0].total_number_of_branches;
			vState = true;
		}
	}

	//console.log(data.highest_pay_per_employee);
	
	const rCOLUMNS = {
		branch_id : {
			key:"branch_id",
			title:"branch_id",
			value: v => v.branch_id,
			sortable: true,
			headerClass: "border border-slate-600",
		},
		num_employees : {
			key:"num_employees",
			title:"num_employees",
			value: v => v.num_employees,
			sortable: true,
			headerClass: "border border-slate-600",
		},
	}

	const vCOLUMNS = {
		branch_id : {
			key:"branch_id",
			title:"branch_id",
			value: v => v.branch_id,
			sortable: true,
			headerClass: "border border-slate-600",
		},
		num_employees : {
			key:"num_employees",
			title:"num_employees",
			value: v => v.num_employees,
			sortable: true,
			headerClass: "border border-slate-600",
		},
	};
	
	const nCOLUMNS = {
		total_number_of_employees : {
			key:"total_number_of_employees",
			title:"total_number_of_employees",
			value: v => v.total_number_of_employees,
			sortable: true,
			headerClass: "border border-slate-600",
		},
		total_number_of_branches : {
			key:"total_number_of_branches",
			title:"total_number_of_branches",
			value: v => v.total_number_of_branches,
			sortable: true,
			headerClass: "border border-slate-600",
		},
	};

	$: rCols = rSelectedCols.map(key => rCOLUMNS[key]);
	$: vCols = vSelectedCols.map(key => vCOLUMNS[key]);
	$: nCols = nSelectedCols.map(key => nCOLUMNS[key]);
	
</script>
	
	<svelte:head>
		<title>Feature Five</title>
	</svelte:head>
	
	<body class="bg-gray-100 font-sans leading-normal tracking-normal">
		<nav id="headerab" class="w-full z-10 top-0">
	
			<div id="progress" class="h-1 z-20 top-0"></div>
	
			<div class="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-5 py-3">
	
				<div class="mx-auto">
					<a class="text-gray-900 text-4xl no-underline hover:no-underline font-extrabold md:text-5xl small-caps" href="/">
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
		<div class="container w-full md:max-w-3xl mt-2 mx-auto pb-20">
	
			<div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">
	 
				<!--Title-->
				<div class="font-sans">
					<p class="text-base md:text-sm text-green-500 font-bold text-center"><a href="/" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">&lt; BACK</a></p>
					<p class="text-base md:text-sm text-green-500 font-bold text-center"><br /></p>
					<h1 class="font-bold font-sans break-normal text-gray-900 text-3xl -mb-0.5 md:text-4xl small-caps">feature five</h1>
					<p class="text-sm md:text-base font-normal text-gray-600 pb-1"><strong class="small-caps text-gray-900">modification + query:</strong> delete the branch with the lowest employee count</p>
				</div>
				<div class="code-block font-sans">
				<CodeBlock class="p-4" language="sql" background='bg-[#141517]' text='text-sm' buttonCopy='p-0.5 pt-0 border border-2 rounded-none uppercase' rounded='rounded-container-token' code={`
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
		<button type="submit" class="flex-1 mt-2 block md:inline-block appearance-none bg-green-500 text-white text-base font-bold tracking-wider py-4 rounded shadow hover:bg-green-400" on:click={getQuery}>
			{#if !rLoadingState}
			GO 
			{:else}
			...
			{/if}
		</button>
		<div class='flex-none w-5'></div>
		<button type="submit" class="flex-1 mt-2 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400" on:click={getValidation}>VALIDATE</button>
	</div>
	
	{#if rState}
	<div class="font-sans text-center">
		<p class="text-xl small-caps font-bold text-gray-900 mt-6">before</p>
	</div>
	<div class="row">
		<SvelteTable
			columns={rCols}
			rows={rData[0]} 
			bind:sortBy
			bind:sortOrder
			classNameTable={['w-full table-auto font-sans md:text-base border-collapse border border-slate-500 mt-1']}
			  classNameThead={['bg-green-500 text-white']}
			  classNameCell={'border border-slate-600'}/>
	</div>
	<div class="row">
		<SvelteTable
			columns={nCols}
			rows={[nRData]}
			bind:sortBy
			bind:sortOrder
			classNameTable={['w-full table-auto font-sans md:text-base border-collapse border border-slate-500 mt-1']}
			  classNameThead={['bg-green-500 text-white']}
			  classNameCell={'border border-slate-600'}/>
	</div>
	{/if}

	{#if vState}
	<div class="font-sans text-center">
		<p class="text-xl small-caps font-bold text-gray-900 mt-6">after</p>
	</div>
	
	<div class="row">
		<SvelteTable
			columns={vCols}
			rows={vData[0]} 
			bind:sortBy
			bind:sortOrder
			classNameTable={['w-full table-auto font-sans md:text-base border-collapse border border-slate-500 mt-1']}
			  classNameThead={['bg-green-500 text-white']}
			  classNameCell={'border border-slate-600'}/>
	</div>
	<div class="row">
		<SvelteTable
			columns={nCols}
			rows={[nVData]}
			bind:sortBy
			bind:sortOrder
			classNameTable={['w-full table-auto font-sans md:text-base border-collapse border border-slate-500 mt-1']}
			  classNameThead={['bg-green-500 text-white']}
			  classNameCell={'border border-slate-600'}/>
	</div>
	{/if}
			</div>
	
			<!--/Next & Prev Links-->
	
		</div>
		<!--/container-->
	
		<footer class="bg-white border-t border-gray-400 shadow">
			<div class="container max-w-4xl mx-auto flex py-8">
				<div class="w-full mx-auto flex flex-wrap">
					<div class="mx-auto w-full text-center">
							<h3 class="font-bold text-gray-900">A. El-Zein, S. Ahmad, V. Biyanwila, B. Smith (c) 2022</h3>
					</div>
				</div>
			</div>
		</footer>
	</body>
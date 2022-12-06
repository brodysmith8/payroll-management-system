<script>
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import SvelteTable from "svelte-table";

	let sortBy = "pay_per_employee";
  	let sortOrder = 0;
	let rSelectedCols = ["branch_id", "pay_per_employee"];
	let vSelectedCols = ["branch_id", "pay_per_employee", "total_paid", "number_of_employees"];

	let rData = null;
	let rState = false;
	let vData = null;
	let vState = false;

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
		const res = await fetch('http://localhost:3000/api/branch/highest-pay-per-employee');
		data = await res.json();

		rData = data.highest_pay_per_employee;
		rState = true;
		rLoadingState = false;
	}

	async function getValidation () {
		if (rState) {
			vData = data.validation_list;
			vState = true;
		}
	}

	const rCOLUMNS = {
		branch_id : {
			key:"branch_id",
			title:"branch_id",
			value: v => v.branch_id,
			sortable: true,
			headerClass: "border border-slate-600",
		},
		pay_per_employee : {
			key:"pay_per_employee",
			title:"pay_per_employee",
			value: v => v.pay_per_employee,
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
		pay_per_employee : {
			key:"pay_per_employee",
			title:"pay_per_employee",
			value: v => v.pay_per_employee,
			sortable: true,
			headerClass: "border border-slate-600",				
		},
		total_paid : {
			key:"total_paid",
			title:"total_paid",
			value: v => v.total_paid,
			sortable: true,
			headerClass: "border border-slate-600",				
		},
		number_of_employees : {
			key:"number_of_employees",
			title:"number_of_employees",
			value: v => v.number_of_employees,
			sortable: true,
			headerClass: "border border-slate-600",				
		},
	};
	
	$: rCols = rSelectedCols.map(key => rCOLUMNS[key]);
	$: vCols = vSelectedCols.map(key => vCOLUMNS[key]);
	
</script>
	
	<svelte:head>
		<title>Feature Four</title>
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
					<p class="text-base md:text-sm text-green-500 font-bold text-center"><a href="/features/five" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">NEXT &gt;</a></p>
					<h1 class="font-bold font-sans break-normal text-gray-900 text-3xl -mb-0.5 md:text-4xl small-caps">feature four</h1>
					<p class="text-sm md:text-base font-normal text-gray-600 pb-1"><strong class="small-caps text-gray-900">query:</strong> find the branch with the highest pay-per-employee</p>
				</div>
				<div class="code-block font-sans">
				<CodeBlock class="p-4" language="sql" background='bg-[#141517]' text='text-sm' buttonCopy='p-0.5 pt-0 border border-2 rounded-none uppercase' rounded='rounded-container-token' code={`
SELECT branch_id,
    (total_paid / number_of_employees) AS pay_per_employee
FROM (
        SELECT e.employee_id,
            e.branch_id,
            SUM(total_paid_employee) AS total_paid,
            COUNT(branch_id) AS number_of_employees
        FROM Employee e
            JOIN (
                SELECT employee_id,
                    SUM(payment_salary + payment_bonus) AS total_paid_employee
                FROM Payroll
                GROUP BY employee_id
            ) AS p ON e.employee_id = p.employee_id
        GROUP BY branch_id
    ) AS MainTable
ORDER BY pay_per_employee DESC
LIMIT 1;`}></CodeBlock>
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
		<p class="text-xl small-caps font-bold text-gray-900 mt-6">query result</p>
	</div>
	<div class="row">
		<SvelteTable
			columns={rCols}
			rows={rData} 
			classNameTable={['w-full table-auto font-sans md:text-base border-collapse border border-slate-500 mt-1']}
			  classNameThead={['bg-green-500 text-white']}
			  classNameCell={'border border-slate-600 font-mono'}/>
	</div>
	{/if}

	{#if vState}
	<div class="font-sans text-center">
		<p class="text-xl small-caps font-bold text-gray-900 mt-6">validation result</p>
	</div>

	<div class="row">
		<SvelteTable
			columns={vCols}
			rows={vData} 
			bind:sortBy
      		bind:sortOrder
			classNameTable={['w-full table-auto font-sans md:text-base border-collapse border border-slate-500 mt-1']}
			  classNameThead={['bg-green-500 text-white']}
			  classNameCell={'border border-slate-600 font-mono'}/>
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
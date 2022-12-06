<script>
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import SvelteTable from "svelte-table";

	let sortBy = "employee_id";
  	let sortOrder = 0;
	let rSelectedCols = ["employee_id", "branch_id", "employee_first_name", "employee_last_name", "company_name"];
	let vSelectedCols = ["branch_id", "pay_per_employee", "total_paid", "number_of_employees"];

	let rData = null;
	let rState = false;
	let vData = null;
	let vState = false;

	let rLoadingState = false;

let role_id = 43;
let phone_number = "(519) 563-5593";
let branch_id = 2;
let first_name = "Firstname";
let last_name = "Lastname";
let start_date = "2010-06-25";
let sin = "276390558";
let bank_institution_number = "623";
let bank_transit_number = "12821"; 
let bank_account_number = "0187034";

	async function getQuery () {
		rLoadingState = true;
		let sendObj = `
			{
				"role_id" : ${role_id},
				"phone_number" : "${phone_number}",
				"branch_id" : ${branch_id},
				"first_name" : "${first_name}",
				"last_name" : "${last_name}",
				"start_date" : "${start_date}",
				"sin" : "${sin}",
				"bank_institution_number" : "${bank_institution_number}",
				"bank_transit_number" : "${bank_transit_number}",
				"bank_account_number" : "${bank_account_number}"	
			}
		`;
		const url = `http://localhost:3000/api/employee/`;
		const res = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: sendObj,
		});
		if (res.ok) {
			let data = await res.json();
			rData = data.before;
			vData = data.after;
			rLoadingState = false;
			rState = true;
		} else{
			let data = await res.text();
			alert(data);
			rLoadingState = false;
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
		employee_id : {
			key:"employee_id",
			title:"employee_id",
			value: v => v.employee_id,
			sortable: true,
			headerClass: "border border-slate-600",
		},
		employee_first_name : {
			key:"employee_first_name",
			title:"first_name",
			value: v => v.employee_first_name,
			sortable: false,
			headerClass: "border border-slate-600",		
		},
		employee_last_name : {
			key:"employee_last_name",
			title:"last_name",
			value: v => v.employee_last_name,
			sortable: false,
			headerClass: "border border-slate-600",				
		},
		company_name : {
			key:"company_name",
			title:"company_name",
			value: v => v.company_name,
			sortable: false,
			headerClass: "border border-slate-600",				
		}
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
		}
	};
	
	$: rCols = rSelectedCols.map(key => rCOLUMNS[key]);
	$: vCols = vSelectedCols.map(key => vCOLUMNS[key]);
	
</script>
	
	<svelte:head>
		<title>Feature Two</title>
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
		<div class="container w-full md:max-w-3xl mx-auto pb-20">
	
			<div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">
	 
				<!--Title-->
				<div class="font-sans">
					<p class="text-base md:text-sm text-green-500 font-bold text-center"><a href="/" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">&lt; BACK</a></p>
					<p class="text-base md:text-sm text-green-500 font-bold text-center"><a href="/features/three" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">NEXT &gt;</a></p>
							<h1 class="font-bold font-sans break-normal text-gray-900 text-3xl -mb-0.5 md:text-4xl small-caps">feature two</h1>
							<p class="text-sm md:text-base font-normal text-gray-600 pb-1"><strong class="small-caps text-gray-900">modification:</strong> add a new employee</p>
				</div>
				<div class="code-block font-sans">
				<CodeBlock class="p-4" language="sql" background='bg-[#141517]' text='text-sm' buttonCopy='p-0.5 pt-0 border border-2 rounded-none uppercase' rounded='rounded-container-token' code={`
INSERT INTO EmployeeRole (role_id)
VALUES (${role_id});
INSERT INTO Contact (phone_number)
VALUES ("${phone_number}");
INSERT INTO Employee
VALUES (
        ${role_id},
        "${phone_number}",
        ${branch_id},
        ${first_name},
        ${last_name},
        "${start_date}",
        "${sin}",
        "${bank_institution_number}",
        "${bank_transit_number}",
        "${bank_account_number}",
        (
            SELECT company_name
            FROM Branch
            WHERE branch_id = ${branch_id}
        )
);`}></CodeBlock>
	</div>
	
	<div class="w-full mt-2 pt-1 font-mono mx-auto flex flex-wrap items-center">
		<p class="flex-1 text-base font-semibold tracking-tight text-center">role_id</p>
		<div class='flex-none w-5'></div>
		<p class="flex-1 text-base font-semibold tracking-tight text-center">phone_number</p>
		<div class='flex-none w-5'></div>
		<p class="flex-1 text-base font-semibold tracking-tight text-center">branch_id</p>
	</div>
	<div class="w-full font-mono mb-2 mx-auto pb-1 flex flex-wrap items-center">
		<input class="flex-1 pl-1.5 text-base tracking-wider py-4 rounded shadow" bind:value={role_id}/>
		<div class='flex-none w-5'></div>
		<input class="flex-1 pl-1.5 text-base tracking-wider py-4 rounded shadow" bind:value={phone_number}/>
		<div class='flex-none w-5'></div>
		<input class="flex-1 pl-1.5 text-base tracking-wider py-4 rounded shadow" bind:value={branch_id}/>
	</div>
	
	<div class="w-full mt-1 font-mono mx-auto flex flex-wrap items-center">
		<p class="flex-1 text-base font-semibold tracking-tight text-center">first_name</p>
		<div class='flex-none w-5'></div>
		<p class="flex-1 text-base font-semibold tracking-tight text-center">last_name</p>
	</div>
	<div class="w-full font-mono mb-2 mx-auto pb-1 flex flex-wrap items-center">
		<input class="flex-1 pl-1.5 text-base tracking-wider py-4 rounded shadow" bind:value={first_name}/>
		<div class='flex-none w-5'></div>
		<input class="flex-1 pl-1.5 text-base tracking-wider py-4 rounded shadow" bind:value={last_name}/>
	</div>

	<div class="w-full mt-1 font-mono mx-auto flex flex-wrap items-center">
		<p class="flex-1 text-base font-semibold tracking-tight text-center"></p>
		<div class='flex-none w-5'></div>
		<p class="flex-1 text-base font-semibold tracking-tight text-center">SIN</p>
		<div class='flex-none w-5'></div>
		<p class="flex-1 text-base font-semibold tracking-tight text-center"></p>
	</div>
	<div class="w-full font-mono mb-3 mx-auto pb-1 flex flex-wrap items-center">
		<div class="flex-1 pl-1.5 text-base tracking-wider py-4"/>
		<div class='flex-none w-5'></div>
		<input class="flex-1 pl-1.5 text-base tracking-wider py-4 rounded shadow" bind:value={sin}/>
		<div class='flex-none w-5'></div>
		<div class="flex-1 pl-1.5 text-base tracking-wider py-4"/>
	</div>

	<div class="w-full font-sans p-1 pr-0 pl-0 flex flex-wrap items-center">
		<div class='flex-none w-10'></div>
		<button type="submit" class="flex-1 mt-2 block md:inline-block appearance-none bg-green-500 text-white text-base font-bold tracking-wider py-4 rounded shadow hover:bg-green-400" on:click={getQuery}>
			{#if !rLoadingState}
			GO 
			{:else}
			...
			{/if}
		</button>
		<div class='flex-none w-10'></div>
	</div>
	
	{#if rState}
	<div class="font-sans text-center">
		<p class="text-xl small-caps font-bold text-gray-900 mt-6">before</p>
	</div>
	<div class="row">
		<SvelteTable
			columns={rCols}
			rows={rData} 
			bind:sortBy
      		bind:sortOrder
			classNameTable={['w-full table-auto font-sans md:text-base border-collapse border border-slate-500 mt-1']}
			  classNameThead={['bg-green-500 text-white']}
			  classNameCell={'border border-slate-600'}/>
	</div>
	<div class="font-sans text-center">
		<p class="text-xl small-caps font-bold text-gray-900 mt-6">after</p>
	</div>

	<div class="row">
		<SvelteTable
			columns={rCols}
			rows={vData} 
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
			rows={vData} 
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
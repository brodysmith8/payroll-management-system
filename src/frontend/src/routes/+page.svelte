<svelte:head>
    <title>Regent Park Enterprises</title>
</svelte:head>

<body class="bg-gray-100 font-sans leading-normal tracking-normal">

	<nav id="header" class="w-full z-10 top-0">

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
	<div class="container w-full md:max-w-3xl mt-0 mx-auto pb-20">

		<div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">

            <div class="font-sans">
                <h1 class="font-bold font-sans break-normal text-center text-gray-900 text-2xl md:text-2xl small-caps">premise</h1>
                <div class="flex w-full md:w-3/4 text-justify mx-auto">
					<div class="px-8">
						<p class="py-2 text-gray-600 text-sm">
							Regent Park Payroll <i>(RPP)</i> is an enterprise-grade payroll management
system. <i>RPP</i> provides a platform for company accountants to drive deep insights into the distribution of wage outflow.
						</p>
                        <p class="py-4 text-gray-600 text-sm">
							By choosing Regent Park Payroll, you are also choosing an extensive array of audit and accountability capabilities. Income tax forms are generated, stored, and automatically available to employees through <i>RPP.</i> 
						</p>
					</div>
				</div>
            </div>

            <!--Title-->
			<div class="font-sans">
						<h1 class="font-bold font-sans break-normal text-center text-gray-900 text-2xl md:text-2xl small-caps">features</h1>
			</div>

            <div class="flex flex-wrap py-1 font-sans text-xl inline">
                <div class="flex-initial w-40">
			        <p><strong class="small-caps font-bold">feature one:</strong></p>
                </div>
                <p class = "flex-1 w-15 text-left">change employee branch, update the name of the company they work at. <a href="/features/one" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">GO ></a></p>
            </div>
            
            <div class="flex flex-wrap py-1 font-sans text-xl inline">
			    <p class = "flex-initial w-40"><strong class="small-caps font-bold">feature two:</strong></p>
                <p class = "flex-1 w-15 text-left">add a new employee. <a href="/features/two" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">GO ></a></p>
            </div>

            <div class="flex flex-wrap py-1 font-sans text-xl inline">
			    <p class = "flex-initial w-40"><strong class="small-caps font-bold">feature three:</strong></p>
                <p class = "flex-1 w-15 text-left">find the highest paid employee in the last four months. <a href="/features/three" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">GO ></a></p>
            </div>

            <div class="flex flex-wrap py-1 font-sans text-xl inline">
			    <p class = "flex-initial w-40"><strong class="small-caps font-bold">feature four:</strong></p>
                <p class = "flex-1 w-15 text-left">find the branch with the highest pay-per-employee. <a href="/features/four" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">GO ></a></p>
            </div>

            <div class="flex flex-wrap py-1 font-sans text-xl inline">
			    <p class = "flex-initial w-40"><strong class="small-caps font-bold">feature five:</strong></p>
                <p class = "flex-1 w-15 flex-grow text-left">delete the branch with the lowest employee count. <a href="/features/five" class="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">GO ></a></p>
            </div>
		</div>

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
</body>
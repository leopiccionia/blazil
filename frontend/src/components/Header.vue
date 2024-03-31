<template>
	<header class="main-header">
		<div class="content">
			<RouterLink class="site-logo" :to="{ name: '/' }">
			<img src="~~/assets/images/logo.svg" alt="Blazil">
				<span class="site-name">Blazil</span>
			</RouterLink>
			<span class="site-description">Banco de dados de brasões cívicos brasileiros</span>
		</div>
	</header>
</template>

<style>
	header.main-header {
		background-color: var(--blue);

		& .content {
			align-items: center;
			display: flex;
			gap: 2rem;
			line-height: 2rem;
			padding: 1rem;
		}

		& .site-logo {
			align-items: center;
			display: flex;
			gap: 1ch;
			text-decoration: none;

			& img {
				height: 2rem;
			}

			& .site-name {
				color: white;
				font-family: var(--heading-font);
				font-size: 2rem;
			}
		}

		& .site-description {
			color: var(--yellow);
			font-family: var(--heading-font);
			line-height: 2rem;
			font-size: 1.25rem;

			@media screen and (max-width: 768px) {
				display: none;
			}
		}
	}
</style>

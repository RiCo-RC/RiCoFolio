import type { Experience } from "@src/types";

export const experiences: Experience[] = [
	{
		id: "ex2",
		slug: "stage-serfa",
		label:
			"Stage de formation - Développeur Full Stack – Application de gestion d’entreprise",
		company: "Wigi",
		startDate: "2025-04",
		endDate: "2025-07",
		isAlternance: false,
		isInternship: false,
		internshipDuration: "0",
		profile: ["dev"],
		description: "",
		location: "Grand-Est, France",
		tasks: [
			"Conception et développement d’une application de gestion interne (architecture complète).",
			"Développement du backend en Spring Boot : API REST sécurisées, gestion des rôles et authentification.",
			"Réalisation du frontend en ReactJS/TypeScript : interfaces responsives, formulaires, intégration API.",
			"Conception et administration de la base de données PostgreSQL (schéma, migrations, optimisation des requêtes).",
			"Mise en place de bonnes pratiques : documentation, tests unitaires/intégration.",
		],
		learnings: [],
	},
	{
		id: "ex1",
		slug: "stage-greta",
		label:
			"Stage de formation - Chef de projet & Développeur – Refonte du site e-commerce",
		company: "Wigi",
		startDate: "2024-01",
		endDate: "2024-03",
		isAlternance: false,
		isInternship: false,
		internshipDuration: "0",
		profile: ["dev"],
		description: "",
		location: "Grand-Est, France",
		tasks: [
			"Pilotage du projet de refonte et création complète d’un site e-commerce.",
			"Coordination d’une équipe (répartition des tâches, suivi de l’avancement).",
			"Conception et intégration du design (maquettes, identité visuelle, ergonomie).",
			"Développement et personnalisation sous WordPress/WooCommerce (thèmes, plugins, optimisation).",
			"Mise en place des fonctionnalités e-commerce (catalogue produits, paiement en ligne, gestion des commandes).",
			"Préparation du lancement en ligne et optimisation SEO de base.",
		],
		learnings: [],
	},
];

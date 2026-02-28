<?php

/**
 * Template Name: page Suggestions
 * Suggestions Page Template
 *
 **/

use Timber\Timber;

$context     = Timber::context();
$timber_post = Timber::get_post();
$context['post'] = $timber_post;

// Récupère éventuels champs ACF de la page
$context['menu_pdf'] = function_exists('get_field') ? get_field('menu_pdf', $timber_post->ID) : null;
// Charger sous-titre ACF et bloc 'plateau_repas' (à créer dans l'admin ACF)
$context['sous_titre_suggestions'] = function_exists('get_field') ? get_field('sous-titre_suggestions', $timber_post->ID) : null;
$context['plateau_repas'] = function_exists('get_field') ? get_field('plateau_repas', $timber_post->ID) : null;

// Récupère les champs ACF de sélection par section
$selected_pieces = function_exists('get_field') ? get_field('select_pieces_cocktail', $timber_post->ID) : null;
$selected_mezzes = function_exists('get_field') ? get_field('select_mezzes', $timber_post->ID) : null;
$selected_buffets = function_exists('get_field') ? get_field('select_buffets', $timber_post->ID) : null;
$selected_diner = function_exists('get_field') ? get_field('select_diner_assiette', $timber_post->ID) : null;

$context['suggestion_groups'] = [];

// helper to convert ACF relationship (IDs or objects) to Timber posts
$get_posts_from_field = function ($field) {
	if (!$field) return [];
	return Timber::get_posts($field);
};

// Définit l'ordre, les groupes et le layout (title left/right)
$context['suggestion_groups'][] = [
	'title' => 'Pièces cocktail',
	'posts' => $get_posts_from_field($selected_pieces),
	'special' => false,
	'title_left' => true,
];

$context['suggestion_groups'][] = [
	'title' => 'Mezzes',
	'posts' => $get_posts_from_field($selected_mezzes),
	'special' => false,
	'title_left' => false,
];

$context['suggestion_groups'][] = [
	'title' => 'Buffet chaud & Brunch',
	'posts' => $get_posts_from_field($selected_buffets),
	'special' => false,
	'title_left' => true,
];

$context['suggestion_groups'][] = [
	'title' => "Dîner à l'assiette",
	'posts' => $get_posts_from_field($selected_diner),
	'title_left' => false,
];

// Alternate title_left across sections (true = title left)
foreach ($context['suggestion_groups'] as $i => &$g) {
	$g['title_left'] = ($i % 2) === 0;
}

Timber::render('page-suggestions.twig', $context);

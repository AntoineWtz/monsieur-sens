<?php

/**
 * Template Name: page Galerie
 * Galerie Page Template
 *
 **/

use Timber\Timber;

$context     = Timber::context();
$timber_post = Timber::get_post();
$context['post'] = $timber_post;

// Récupère tous les plats qui ont une image mise en avant
$args = [
    'post_type'      => 'plat',
    'posts_per_page' => -1,
    'post_status'    => 'publish',
    'orderby'        => 'title',
    'order'          => 'ASC',
    'meta_query'     => [
        [
            'key'     => '_thumbnail_id',
            'compare' => 'EXISTS',
        ],
    ],
];

$context['plats'] = Timber::get_posts($args);

Timber::render('page-galerie.twig', $context);

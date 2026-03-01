<?php

/**
 * Template Name: page Accueil
 * Front Page Template
 *
 **/

use Timber\Timber;

$context     = Timber::context();
$timber_post = Timber::get_post();
$context['post'] = $timber_post;

// prepare suggestions list with optional section slug for anchor links
if ( function_exists('get_field') ) {
    $raw = get_field('bloc_suggestions', $timber_post->ID);
    $processed = [];
    if (is_array($raw)) {
        foreach ($raw as $item) {
            $slug = '';
            // allow explicit section field or derive from title if needed
            if (!empty($item['section'])) {
                $slug = sanitize_title($item['section']);
            } elseif (!empty($item['titre_suggestion'])) {
                // fallback - not ideal but avoids empty anchor
                $slug = sanitize_title($item['titre_suggestion']);
            }
            $item['slug'] = $slug;
            $processed[] = $item;
        }
    }
    $context['suggestions'] = $processed;
} else {
    $context['suggestions'] = [];
}

// url to the suggestions page for constructing links
$context['suggestions_page_url'] = get_permalink( get_page_by_path('suggestions') );

Timber::render('front-page.twig', $context);

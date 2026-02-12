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

Timber::render('page-galerie.twig', $context);

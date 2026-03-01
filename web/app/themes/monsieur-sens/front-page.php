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

Timber::render('front-page.twig', $context);

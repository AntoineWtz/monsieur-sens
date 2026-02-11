<?php

use Timber\Site;

/**
 * Class StarterSite
 */
class StarterSite extends Site {
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);


		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_filter( 'timber/twig/environment/options', [ $this, 'update_twig_environment_options' ] );

		add_action('after_setup_theme', [$this, 'theme_locale_setup']);

		add_filter('show_admin_bar', '__return_false');

		parent::__construct();
	}

	/**
	 * This is where you can register custom post types.
	 */
	public function register_post_types() {

	}

	/**
	 * This is where you can register custom taxonomies.
	 */
	public function register_taxonomies() {

	}

	/**
	 * This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['foo']   = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';
		$context['menu']  = Timber::get_menu();
		$context['site']  = $this;

		return $context;
	}


	public function theme_locale_setup()
    {
        $path =  get_template_directory() . '/languages';
        $result = load_theme_textdomain('cwstarter', $path);

        if ($result)
            return;

        $locale = apply_filters('theme_locale', get_locale(), 'cwstarter');

    }


	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
	}

	/**
	 * his would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/**
	 * This is where you can add your own functions to twig.
	 *
	 * @param Twig\Environment $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		/**
		 * Required when you want to use Twig’s template_from_string.
		 * @link https://twig.symfony.com/doc/3.x/functions/template_from_string.html
		 */
		// $twig->addExtension( new Twig\Extension\StringLoaderExtension() );

		$twig->addFilter( new Twig\TwigFilter( 'myfoo', [ $this, 'myfoo' ] ) );

		return $twig;
	}

	/**
	 * Updates Twig environment options.
	 *
	 * @link https://twig.symfony.com/doc/2.x/api.html#environment-options
	 *
	 * \@param array $options An array of environment options.
	 *
	 * @return array
	 */
	public function update_twig_environment_options( $options ) {
	    // $options['autoescape'] = true;

	    return $options;
	}


	public function enqueue_scripts() {

		$base_url = get_home_url();
		$base_path = substr(ABSPATH, 0, -3);

		$context  = stream_context_create(
			array(
			  'http' => array(
				'header' => 'User-Agent: Mozilla/5.0 (Windows NT 6.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0',
			),
		));
  
		$entrypoints = json_decode(file_get_contents(join("/", [get_template_directory_uri(), 'dist', 'entrypoints.json']), false, $context));

		wp_enqueue_script(
			'bud/js',
			$base_url . $entrypoints->app->js[1],
			[],
			$this->get_file_hash($base_path . $entrypoints->app->js[1]),
			true
		);
		wp_add_inline_script(
			'bud/js',
			file_get_contents($base_path . $entrypoints->app->js[0]),
			'before',
		);

		if( in_array(WP_ENV, ['staging', 'production']) ) {

			wp_enqueue_style(
				'bud/css',
				$base_url . $entrypoints->app->css[0],
				[],
				$this->get_file_hash($base_path . $entrypoints->app->css[0])
			);
			
		}

    }


	public static function get_file_hash($file)
    {
        $hash = @md5_file($file);
        if ($hash) {
            return $hash;
        }
        return null;
    }


}

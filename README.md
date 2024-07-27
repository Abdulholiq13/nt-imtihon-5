The main file main.scss should be the only .scss file not to begin with an underscore, so that it compiles into normal CSS. This file should contain all your imported partials folders using the @use rule and it's compiled css file should be linked in all pages of your application (files in the pages/ folder can be also made to be compiled to link each compiled CSS stylesheet to it's respective page).

sass/
|
|– base/
| |– \_reset.scss # Reset/normalize
| |– \_typography.scss # Typography rules
| ... # Etc…
|
|– components/
| |– \_buttons.scss # Buttons
| |– \_carousel.scss # Carousel
| |– \_cover.scss # Cover
| |– \_dropdown.scss # Dropdown
| ... # Etc…
|
|– layout/
| |– \_navigation.scss # Navigation
| |– \_grid.scss # Grid system
| |– \_header.scss # Header
| |– \_footer.scss # Footer
| |– \_sidebar.scss # Sidebar
| |– \_forms.scss # Forms
| ... # Etc…
|
|– pages/
| |– \_home.scss # Home specific styles
| |– \_contact.scss # Contact specific styles
| ... # Etc…
|
|– sass-utils/
| |– \_variables.scss # Sass Variables
| |– \_functions.scss # Sass Functions
| |– \_mixins.scss # Sass Mixins
| |– \_helpers.scss # Class & placeholders helpers
|
|– vendors/
| |– \_bootstrap.scss # Bootstrap
| |– \_jquery-ui.scss # jQuery UI
| ... # Etc…
|
|
`– style.scss # Primary Sass file
# nt-imtihon-5

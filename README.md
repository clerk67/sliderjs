# slider.js

HTML5 input component controlled by drag and drop

## Demo

[**slider.js demo**](https://clerk67.github.io/sliderjs/)

## Dependencies

- [jQuery](https://jquery.com) v3.x (**Notice:** Slim build cannot be used!)
- [Font Awesome](https://fontawesome.com/) v5.x

## Usage

```html
<!-- load slider.css -->
<link rel="stylesheet" href="slider.css">

<!-- number slider -->
<div class="slider">
  <span class="current" min="0" max="100" step="5">20</span>
  <!-- min, max, step attributes must be specified -->
  <span class="guide-down"></span>
  <span class="guide-up"></span>
</div>

<!-- custom slider -->
<div class="slider">
  <span class="current" data='["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]'>Jan</span>
  <!-- data attribute must be specified in JSON string -->
  <span class="guide-down"></span>
  <span class="guide-up"></span>
</div>

<!-- load slider.js -->
<script type="text/javascript" src="slider.js"></script>
```

## Notes

- Pressing <kbd>Shift</kbd> key during drag accelerates scrolling by 10 times.

# TGA tabs js
Manage tabs whitout display none


### HTML
``` html
<div class="tabbed-wrap" data-effect="fade">
    <div class="toggle-wrap">
        <div class="tab" data-tab="upsell-products">
            tab1
        </div>
        <div class="tab" data-tab="related-products">
            tab2
        </div>
    </div>
    <div class="tab-content upsell_products products-block" data-tab-content="upsell-products">
        tab1 content
    </div>
    <div class="tab-content related-block products-block" data-tab-content="related-products">
        tab2 content
    </div>
</div> 
``` 
### Settings

Option | Default | Permitted | Usage 
------ | ------- | ----------- | --------
effect | slide | slide, fade | Insert in 'tabbed-wrap' element a  data attribute named 'data-effect' whit permitted value 

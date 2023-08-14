class Shadow {
    constructor(form_element, css_element, shadow_elements, values) {
        // DEFAULTS
        this.shadows = [{"x":-10,"y":-10,"blur":15,"spread":0,"color":"rgba(255,255,255,0.5)","inset":false},{"x":10,"y":10,"blur":15,"spread":0,"color":"rgba(70,70,70,0.12)","inset":false},];
        this.backgroundColor = "#ececec";

        // parsing arguments
        this.form_element = form_element
        this.css_element = css_element
        this.shadow_elements = shadow_elements

        // parsing values
        for (const [key, value] of Object.entries(values)) {
            if (value != null) {
                this[key] = value;
            }
        }

        this.render_form()
        this.render_shadows()
        this.generate_css()
    }
    render_form() {
        var html = this.shadows.reduce(function (html, shadow, index) 
        {
            html += `
            <div class="card" oninput="shadow.change_shadow(event,${index});">
                <div class="navigation" style="border-color:${shadow['color']}">
                    <div class="left">
                        <a onclick="shadow.remove_shadow(${index})"><span class="material-symbols-rounded" aria-label="Remove shadow.">close</span></a>
                        <a title="Inset" onclick="shadow.toggle_inset(${index});" aria-label="Toggle between inset and not inset.">${(shadow["inset"] == true) ? '<span class="material-symbols-rounded">fullscreen_exit</span>':'<span class="material-symbols-rounded">fullscreen</span>'}</a>
                        <div class="color">
                            <div class="clr-field color-picker-compact" style="color: ${shadow['color']};">
                                <button type="button" aria-labelledby="clr-open-label"></button>
                                <input class="coloris" type="text" name="color" value="${shadow['color']}" data-coloris="">
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <a onclick="$(this).parent().parent().next().slideToggle();" aria-label="Toggle controls visibility."><span class="material-symbols-rounded">expand_more</span></a>
                    </div>
                </div>
                <div class="controls">
                    <div class="arrows">
                        <a onclick="shadow.move_shadow(${index},'up')"><span class="material-symbols-rounded" aria-label="Move shadow UP.">arrow_upward</span></a>
                        ${index + 1}
                        <a onclick="shadow.move_shadow(${index},'down')"><span class="material-symbols-rounded" aria-label="Move shadow DOWN.">arrow_downward</span></a>
                    </div>
                    <div class="sliders">
                        <div class="input">
                            <span class="material-symbols-rounded">width</span>
                            <input class="slider" type="range" name="x" min="-50" max="50" value="${shadow['x']}">
                            <input type="text" name="x" value="${shadow['x']}">px
                        </div>
                        <div class="input">
                            <span class="material-symbols-rounded">height</span>
                            <input class="slider" type="range" name="y" min="-50" max="50" value="${shadow['y']}">
                            <input type="text" name="y" value="${shadow['y']}">px
                        </div>
                        <div class="input">
                            <span class="material-symbols-rounded">blur_on</span>
                            <input class="slider" type="range" name="blur" min="0" max="50" value="${shadow['blur']}">
                            <input type="text" name="blur" value="${shadow['blur']}">px
                        </div>
                        <div class="input">
                            <span class="material-symbols-rounded">circle</span>
                            <input class="slider" type="range" name="spread" min="0" max="50" value="${shadow['spread']}">
                            <input type="text" name="spread" value="${shadow['spread']}">px
                        </div>
                    </div>
                </div>
            </div>`;
            return html;
        },"");
        
        this.form_element.innerHTML = html;
    }
    generate_css() {
        var shadow = "box-shadow: ";
        shadow += this.shadows.reduce(function (shadow, item, index) {
            shadow += `${item["x"]}px ${item["y"]}px ${item["blur"]}px ${item["spread"]}px ${item["color"]} ${(item["inset"] == true) ? 'inset':''},`
            return shadow;
        },"");
        
        shadow = shadow.slice(0,-1)
        shadow += ";"
        this.css_element.innerHTML = shadow;
    }
    render_shadows() {
        var shadow = this.shadows.reduce(function (shadow, item, index) {
            shadow += `${item["x"]}px ${item["y"]}px ${item["blur"]}px ${item["spread"]}px ${item["color"]} ${(item["inset"] == true) ? 'inset':''},`
            return shadow;
        },"");
        shadow = shadow.slice(0,-1)
        // Assigns CSS to elements
        this.elements = document.getElementsByClassName("shadow")
        for (var i = this.elements.length - 1; i >= 0; i--) {
            this.elements[i].style.boxShadow = shadow;

        }
    }
    change_shadow(event, index) {
        var value = event.target.value;
        var siblings = event.target.parentNode.children;
        for (var i = siblings.length - 1; i >= 0; i--) {
            siblings[i].value = value;
        }

        var property = event.target.name; 

        this.shadows[index][property] = event.target.value;
        this.render_shadows()
        this.generate_css()
        

    }
    toggle_inset(index) {
        if (this.shadows[index]["inset"]) {
            this.shadows[index]["inset"] = false;
        } else {
            this.shadows[index]["inset"] = true;
        }
        this.render_form();
        this.render_shadows();
    }
    add_shadow() {
        this.shadows.push({"x":10,"y":10,"blur":10,"spread":10,"color":"#ffffff","inset":false});
        this.render_form();
        this.render_shadows();
        this.generate_css()
    }
    remove_shadow(index) {
        this.shadows.pop(index);
        this.render_form();
        this.render_shadows();
        this.generate_css()

    }
    move_shadow(index, position) {
        if (position == "up" && index != 0) {
            var shadow = this.shadows.splice(index, 1);
            this.shadows.splice(index-1,0,shadow[0]);
        }
        if (position == "down" && index != this.shadows.length) {
            var shadow = this.shadows.splice(index, 1);
            this.shadows.splice(index+1,0,shadow[0]);
        }
        this.render_form();
        this.render_shadows();

    }

} 

/**
 * Class that handles lazy loading images
 */
export default class {
    /**
     * @param {object} holders Temporary placeholders for images
     * @return {void}
     */
    constructor(holders) {
        this.holders = holders
    }

    /**
     * Get all attributes from placeholder DOM elements,
     * and return them
     * 
     * @param {object} holder 
     * @return {object}
     */
    getAttributes(holder) {
        return {
            class: holder.getAttribute('data-class'),
            height: holder.getAttribute('data-height'),
            src: holder.getAttribute('data-lazy-load'),
            alt: holder.getAttribute('data-alt'),
        }
    }

    /**
     * Adds given attributes to a given image
     * 
     * @param {object} image Image that needs new attributes
     * @param {object} attrs Attributes that needs to be added to image
     * @return {void}
     */
    setAttributes(image, attrs) {
        attrs.height ? (image.height = attrs.height) : ''
        attrs.class ? (image.className = attrs.class) : ''
        attrs.src ? (image.src = attrs.src) : ''
        attrs.alt ? (image.alt = attrs.alt) : ''
    }

    /**
     * Adds classes to a DOM element
     * 
     * @param {object} elem Element that needs to have classes
     * @param {array} classes Classes that needs to be added to elem
     * @return {void}
     */
    addClassesTo(elem, classes) {
        classes.forEach(className => elem.classList.add(className))
    }

    /**
     * Appends image to a placeholder and removes class from
     * placeholder and appended image object
     * 
     * @param {object} image
     * @param {objet} holder
     * @return {void}
     */
    loadImageInDOM(image, holder) {
        image.onload = () => {
            holder.appendChild(image)
            holder.classList.remove('ieb-lazy-load')
            setTimeout(() => image.classList.remove('ieb-hide'), 1);
        }
    }

    /**
     * Creates image object, gets attributes from placeholder,
     * sets them on image object, adds classes to image and 
     * when image is loaded, appends it to a placeholder
     * 
     * @return {void}
     */
    start() {
        this.holders.forEach(holder => {
            const img = new Image()
            const attrs = this.getAttributes(holder)

            this.setAttributes(img, attrs)
            this.addClassesTo(img, ['ieb-lazy-loaded', 'ieb-hide'])
            this.loadImageInDOM(img, holder)
        })
    }
}
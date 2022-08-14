(function() {
    const slider = document.getElementById('slider')
    const sliderContainer = document.getElementById('slide-wrapper')
    const arrowLeft = document.getElementById('arrow-left')
    const arrowRight = document.getElementById('arrow-right')
    
    const images = document.querySelectorAll('.slide')
    const initialWidth = images[0].clientWidth
    console.log(initialWidth)
    
    let counter = 1
    let swipeMove = 0
    let isClicked = false
    let isDragged = false
    let isTouched = false
    let startPoint = 0
    let touchX = 0
    let direction = ''
    slider.style.width = `${initialWidth}px`
    
    sliderContainer.style.transform = `translateX(-${initialWidth * counter}px)`
    
    arrowRight.addEventListener('click', (e) => { 
        clickHandler(e)
    })
    
    arrowLeft.addEventListener('click', (e) => {
        clickHandler(e)
    })

    const clickHandler = (e) => {
        if(isClicked) return
        
        if(e.target.id === 'arrow-left') {
            counter--
        } else if(e.target.id === 'arrow-right') {
            counter++
        }

        // console.log('counter: ', counter, this, e.target.id)
        
        isClicked = true
        
        sliderContainer.style.transform = `translateX(-${initialWidth * counter}px)`
        // console.log('click', counter)
        
        sliderContainer.style.transitionDuration = `300ms`
        setTimeout(() => {
            sliderContainer.style.transitionDuration = `0ms`
            if(counter === images.length - 1) {
                counter = 1
                sliderContainer.style.transform = `translateX(-${initialWidth}px)`
            }

            if(counter === 0) {
                counter = images.length - 2
                sliderContainer.style.transform = `translateX(-${initialWidth * counter}px)`
            }

            isClicked = false
        }, 300)
    }

    const startMouseMove = (e) => {
        e.preventDefault()
        // console.log('mousedown', e)
        isDragged = true
        startPoint = e.layerX
    }

    sliderContainer.addEventListener('mousedown', (e) => {
        startMouseMove(e)
    })

    // sliderContainer.removeEventListener('mousedown', startMouseMover)

    sliderContainer.addEventListener('mousemove', (e) => {
        
        if(e.movementX > 0) {
            direction = 'right'
        } else if(e.movementX < 0) {
            direction = 'left'
        }

        if(isDragged) {
            swipeMove = e.layerX - startPoint
            if(direction === 'right') {
                sliderContainer.style.transform = `translateX(-${(initialWidth * counter) - swipeMove }px)`
            } else if(direction === 'left') {
                sliderContainer.style.transform = `translateX(-${(initialWidth * counter) + (-swipeMove) }px)`
            }
        }
    })

    sliderContainer.addEventListener('mouseup', () => {
        // console.log('mouseup')
        isDragged = false
        if(swipeMove > (initialWidth / 2) && direction === 'right') {
            console.log('ARIS')
            counter--
        }

        if(swipeMove < (-initialWidth / 2) && direction === 'left') {
            console.log('ARIS')
            counter++
        }
        
        sliderContainer.style.transitionDuration = `150ms`
        sliderContainer.style.transform = `translateX(-${initialWidth * counter }px)`
        // console.log(swipeMove, initialWidth / 2, 'swipeMove')
        setTimeout(() => {
            sliderContainer.style.transitionDuration = `0ms`
            if(counter === 0) {
                counter = images.length - 2
                sliderContainer.style.transform = `translateX(-${initialWidth * counter}px)`
            }
        }, 300)

        setTimeout(() => {
            sliderContainer.style.transitionDuration = `0ms`
            if(counter === images.length - 1) {
                counter = 1
                sliderContainer.style.transform = `translateX(-${initialWidth}px)`
                console.log(isClicked)
            }
            isClicked = false
        }, 300)
        
        swipeMove = 0
    })

    document.addEventListener('touchstart', (e) => {
        touchX = e.changedTouches[0].pageX
        
    })
    
    document.addEventListener('touchmove', (e) => {
        if(isTouched) {
            return
        }
        isTouched = true

        if(e.type === 'touchmove' && e.changedTouches[0].pageX < touchX) {
            counter++
        } else if(e.type === 'touchmove' && e.changedTouches[0].pageX > touchX) {
            counter--
        }
        sliderContainer.style.transitionDuration = `300ms`
        sliderContainer.style.transform = `translateX(-${initialWidth * counter}px)`

        setTimeout(() => {
            sliderContainer.style.transitionDuration = `0ms`
            if(counter === images.length - 1) {
                counter = 1
                sliderContainer.style.transform = `translateX(-${initialWidth}px)`
            }

            if(counter === 0) {
                counter = images.length - 2
                sliderContainer.style.transform = `translateX(-${initialWidth * counter}px)`
            }

            
        }, 300)
    })

    document.addEventListener('touchend', (e) => {
        isTouched = false
    })

})()
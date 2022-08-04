(function() {
    const slider = document.getElementById('slider')
    const sliderContainer = document.getElementById('slide-wrapper')
    const arrowLeft = document.getElementById('arrow-left')
    const arrowRight = document.getElementById('arrow-right')
    
    const images = document.querySelectorAll('.slide')
    const initialWidth = images[0].clientWidth
    console.log(initialWidth)
    
    let counter = 1
    let touchMove = 0
    let isClicked = false
    let isDragged = false
    let startPoint = 0
    let direction = ''
    slider.style.width = `${initialWidth}px`
    
    sliderContainer.style.transform = `translateX(-${initialWidth * counter}px)`
    
    arrowRight.addEventListener('click', () => {
        
        if(isClicked) return
        counter++
        isClicked = true
        
        sliderContainer.style.transform = `translateX(-${initialWidth * counter}px)`
        console.log('click', counter)
        
            sliderContainer.style.transitionDuration = `300ms`
            setTimeout(() => {
                sliderContainer.style.transitionDuration = `0ms`
                if(counter === images.length - 1) {
                    counter = 1
                    sliderContainer.style.transform = `translateX(-${initialWidth}px)`
                    console.log(isClicked)
                }
                isClicked = false
            }, 300)
            
    
            console.log(counter, isClicked, images.length - 1)
        
    })
    
    arrowLeft.addEventListener('click', () => {
        counter--
        
        sliderContainer.style.transform = `translateX(-${initialWidth * counter}px)`
        sliderContainer.style.transitionDuration = `300ms`
        setTimeout(() => {
            sliderContainer.style.transitionDuration = `0ms`
            if(counter === 0) {
                counter = images.length - 2
                sliderContainer.style.transform = `translateX(-${initialWidth * counter}px)`
            }
        }, 300)
        
        
        console.log('click', )
    })

    const startMouseMove = (e) => {
        e.preventDefault()
        console.log('mousedown', e)
        isDragged = true
        startPoint = e.layerX
    }

    sliderContainer.addEventListener('mousedown', (e) => {
        startMouseMove(e)
    } )

    // sliderContainer.removeEventListener('mousedown', startMouseMover)

    sliderContainer.addEventListener('mousemove', (e) => {
        let startX = 0
        
        if(e.movementX > 0) {
            direction = 'right'
        } else if(e.movementX < 0) {
            direction = 'left'
        }
        if(isDragged) {
            if(direction === 'right') {
                touchMove = e.layerX - startPoint
                console.log('mousemove',  touchMove)
                console.log(e, sliderContainer.style.transform)
                sliderContainer.style.transform = `translateX(-${(initialWidth * counter) - touchMove }px)`
            } else if(direction === 'left') {
                touchMove = e.layerX - startPoint
                console.log('mousemove',  touchMove)
                console.log(e, sliderContainer.style.transform)
                sliderContainer.style.transform = `translateX(-${(initialWidth * counter) + (-touchMove) }px)`
            }
            
        }
        
    })


    sliderContainer.addEventListener('mouseup', () => {
        console.log('mouseup')
        isDragged = false
        if(touchMove > (initialWidth / 2) && direction === 'right') {
            console.log('ARIS')
            counter--
        }

        if(touchMove < (-initialWidth / 2) && direction === 'left') {
            console.log('ARIS')
            counter++
        }
        
        sliderContainer.style.transitionDuration = `150ms`
        sliderContainer.style.transform = `translateX(-${initialWidth * counter }px)`
        console.log(touchMove, initialWidth / 2, 'Touchmove')
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

       
        
        touchMove = 0
    })

})()
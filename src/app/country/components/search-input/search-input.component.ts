import { Component, output, input , effect, linkedSignal} from '@angular/core';

@Component({
    selector: 'country-search-input',
    templateUrl: './search-input.component.html'
  
})
export class SearchInputComponent {
    placeholder = input('Buscar')
    debounceTime = input(1000)
    initialValue = input<string>('')

    value = output<string>()

    inputValue = linkedSignal<string>(() => this.initialValue())

    debounceEffect = effect((onCleanup) => {
        const value = this.inputValue()

        const timeout = setTimeout(() => {
            this.value.emit(value)
        }, this.debounceTime())

        onCleanup(() => {
            clearTimeout(timeout)
        })
    })

}
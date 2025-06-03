import { Component, output, input , signal, effect} from '@angular/core';

@Component({
    selector: 'country-search-input',
    templateUrl: './search-input.component.html'
  
})
export class SearchInputComponent {
    placeholder = input('Buscar')
    value = output<string>()
    debounceTime = input(300)

    inputValue = signal<string>('')

    deboundeEffect = effect((onCleanup) => {
        const value = this.inputValue()

        const timeout = setTimeout(() => {
            this.value.emit(value)
        }, this.debounceTime())

        onCleanup(() => {
            clearTimeout(timeout)
        })
    })

}
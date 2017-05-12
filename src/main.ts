import {Observable} from "rxjs";
import {div, label, input, hr, h1, VNode, makeDOMDriver} from "@cycle/dom";
import {run} from "@cycle/rxjs-run";
import {DOMSource} from "@cycle/dom/rxjs-typings";

type Sources = {
  DOM: DOMSource;
}

type Sinks = {
  DOM: Observable<VNode>;
}

function main(sources: Sources): Sinks {
  const input$: Observable<Event> = sources.DOM.select(".field").events("input");
  const name$: Observable<string> = Observable.from(input$)
    .map((ev: Event) => (ev.target as HTMLInputElement).value)
    .startWith("");

  const vdom$: Observable<VNode> = name$.map(name => {
    return div(".will", [
      div(".form-group", [
        label("Name: "),
        input(".field.form-control", {attrs: {type: "text"}}),
      ]),
      hr(),
      h1(`Hello ${name}`),
    ]);
  });

  return {
    DOM: vdom$,
  };

}

const drivers = {
  DOM: makeDOMDriver("#app-container")
};

run(main, drivers);


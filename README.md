# mattu-cv

Ein Online-Tool um seinen eigenen Lebenslauf zusammen-zu-klicken. Dieses Project ist entstanden, weil ich kein _nachhaltiges_ Layout erhalten konnte. 
Mein erstes Layout ist unbrauchbar geworden, weil meine Studi-Lizenz von der `Adobe Creative Cloud` ausgelaufen ist und die Produkte einfach zu teuer wurden und ich deswegen kein `InDesign` mehr hatte. Mein zweites Layout ist verloren gegangen, weil ich den `Publisher` von Microsoft nach den ganzen Cloud-Updates nur noch nervig fand und ich das Abo abbestellt habe. Dieser Ansatz ist bestimmt Over-Engineered, aber ich habe die Hoffnung, dass in 4-5 Jahren das Erstellen von PDF-Dokumenten einer Webseite immer noch möglich sein wird 😅.

Der neueste Stand von `mattu-cv` wird automatisch auf den GitHub-Pages hochgeladen:

- https://mattesschu.github.io/mattu-cv/

## Anwendung

Im linken Bereich befindet sich die `Content-Creation`. Dort werden alle Informationen für den hier verwendeten Lebenslauf eingetragen. Auf der rechten Seite wird das Ergebnis angezeigt. Wenn die Inhalte ausreichend gefüllt sind, kann der Lebenslauf gedruckt werden.

Beim Drucken ist zu beachten:

- Seitenränder ausschalten
- Hintergrundfarben aktivieren (wichtig für svg-icons)
- Papiergröße auf `a4` stellen
- Fuß- und Kopfzeilen ausschalten

## Mobile Ansicht

Bei kleinen Bildschirmen werden `Content` und `Viewer` nicht nebeneinander angezeigt. Es kann zwischen den beiden Ansichten über die dann vorhandenen Schalftläche im mittleren oberen Bereich der Seite gewechselt werden.

## Bekannte Probleme

### Firefox SVG

Beim Arbeiten mit Firefox werden die SVG-Icons innerhalb der `Timeline-Bullits` auf der zweiten Seite falsch angezeigt. Das scheint ein Bug von Firefox zu sein, da es auf der ersten Seite nicht auftritt. Mein aktueller Workaround ist es, einen anderen Browser (`Chrome`) zu verwenden.

### PPI auf Handhelds

Die Internetseite ist für Monitore mit 96ppi ausgelegt. Auf bspw. mobilen Endgeräten mit höheren ppi scheint die Schrift und die Komponenten etwas verschoben zu sein. Als erste Lösung habe ich die Schriftgrößen auf `mm` umgestellt und alle `px` Abstände auf mm gesetztt. Dabei scheint es aber immer noch kleinere Probleme zu geben.

### Seitenanzahl beim Chrome-Browser für Android-Geräte

Beim Android Chrome-Browser werden bei der Einstellung `A4` drei Seiten gedruckt. Es kann sein, dass die Abstände beim Drucken dort für die Fußzeile falsch berechnet werden.

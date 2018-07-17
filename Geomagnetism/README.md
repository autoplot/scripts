Autoplot Scripts for Geomagnetism
---------------------------------

Embedded in Autoplot is the Jython (Python in Java) scripting language.
This folder contains scripts for Autoplot written in Jython.

To use a script:

1) Download the script to a place on your computer. $HOME/autoplot_data/scripts/
    is a reasonable choice (but you can put them anywhere). The folder $HOME/autoplot_data
    should already exist once you've run AutoPlot the first time.

2) You can install the script in Autoplot so that you can run it from the menu.
     To do this, you need to edit the file $HOME/autoplot_data/bookmarks/tools.xml
     and add a reference to the script like this:
     
```
    <bookmark>
        <title>INTERMAGNET CDF file viewer (my copy)</title>
        <uri>script:file:/c:/users/smf/autoplot_data/scripts/PlotImagCDF.jy</uri>
    </bookmark>
```

3) Alternatively, you can load the script into AutoPlot by:
   - Make sure that the script panel is visible by going to the menu item
     Options / Enable Feature / Script Panel.
   - Select the 'script' tab on the main window.
   - Use the "Open..." button to open the script and the 'Execute' button to run it.
     
     
Scripts
-------

| Script          | Description |
| ------          | ----------- |
| PlotImagCDF.jy  | Plots all geomagnetic variables from an INTERMAGNET CDF file. Data is displayed a day at a time and Autoplot is configured to scroll through the data using its forward and back timerange buttons. If multiple CDF files are present in the same folder, AutoPlot will move between them using the time selection buttons without need to use the file selector to open individual files. |

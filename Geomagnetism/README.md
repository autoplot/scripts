Autoplot Scripts for Geomagnetism
---------------------------------

Embedded in Autoplot is the Jython (Python in Java) scripting language.
This folder contains scripts for Autoplot written in Jython.

If you want to use a script, you can download it and reference it on your
local file system, but it's easier to run it directly from this repository.
EG to run the PlotImagCDF.py script:

1) Enter the script's GitHub address in AutoPlot's address bar, EG
   "https://raw.githubusercontent.com/autoplot/scripts/master/Geomagnetism/PlotImagCDF.jy".

2) In the resulting "Run Script" dialog, there's a check box towards the bottom of the window
   "Install in tools folder and menu". If you check this box, the script will be downloaded
   and you'll be able to run it from the AutoPlot "Tools" menu.
        
     
Scripts
-------

| Script          | Description |
| ------          | ----------- |
| PlotImagCDF.jy  | Plots all geomagnetic variables from an INTERMAGNET CDF file. Data is displayed a day at a time and Autoplot is configured to scroll through the data using its forward and back timerange buttons. If multiple CDF files are present in the same folder, AutoPlot will move between them using the time selection buttons without need to use the file selector to open individual files. |

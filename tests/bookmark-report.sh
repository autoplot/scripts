JAVA=/usr/lib/jvm/java-6-sun-1.6.0.26/jre/bin/java
DIR=/media/disk/autoplot/bookmarks/tests/
cp bookmark-report.jy $DIR;

cd $DIR

rm -f autoplot.jar
#wget "http://autoplot.org/hudson/job/autoplot-release/lastSuccessfulBuild/artifact/autoplot/VirboAutoplot/dist/autoplot.jar"

wget "http://autoplot.org:8080/hudson/job/autoplot-release/lastSuccessfulBuild/artifact/autoplot/VirboAutoplot/dist/autoplot.jar"

#wget "http://autoplot.org/hudson/job/autoplot-release/330/artifact/autoplot/VirboAutoplot/dist/autoplot.jar"

$JAVA -Djava.awt.headless=true -Xmx1024m -cp autoplot.jar org.virbo.autoplot.JythonMain "$DIR/bookmark-report.jy" outputDir=$DIR start=6254

#$JAVA -Djava.awt.headless=true -Xmx1024m -cp autoplot.jar org.virbo.autoplot.JythonMain "/tmp/bookmark-report.jy"

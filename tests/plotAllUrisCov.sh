JAVA=/usr/lib/jvm/java-6-sun-1.6.0.24/jre/bin/java

cp plotAllUrisCov.jy /tmp;
cp plotAllUrisCov.txt /tmp;

cd /tmp;

rm -f autoplot.jar

wget "http://autoplot.org:8080/hudson/job/autoplot-release/323/artifact/autoplot/VirboAutoplot/dist/autoplot.jar"

$JAVA -Djava.awt.headless=true -Xmx1024m -cp autoplot.jar -Xmx1024m org.virbo.autoplot.JythonMain /tmp/plotAllUrisCov.jy

@echo off & setlocal enabledelayedexpansion

set LIB_JARS=""
cd lib
for %%i in (*) do set LIB_JARS=!LIB_JARS!;lib\%%i
cd ..

if ""%1"" == ""debug"" goto debug

java -Xms64m -Xmx1024m -XX:MaxPermSize=64M -classpath classes;conf;%LIB_JARS% com.alibaba.dubbo.container.Main
goto end

:debug
java -Xms64m -Xmx1024m -XX:MaxPermSize=64M -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n -classpath classes;conf;%LIB_JARS% com.alibaba.dubbo.container.Main
goto end

:jmx
java -Xms64m -Xmx1024m -XX:MaxPermSize=64M -Dcom.sun.management.jmxremote.port=1099 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -classpath ..\conf;%LIB_JARS% com.alibaba.dubbo.container.Main
goto end

:end
pause
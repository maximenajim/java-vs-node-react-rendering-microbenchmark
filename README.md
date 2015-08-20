# nashorn-react-microbenchmark
micro-benchmark of Java 8 nashorn - server-side rendering of a react component — Edit

## Compiling and Running
$ javac ReactMicroBenchmark.java

$ java ReactMicroBenchmark


running with specific number of executions, e.g.

$ java ReactMicroBenchmark 100

running with specific number of executions and number of comments in react comment box, e.g.

$ java ReactMicroBenchmark 100 10

## Perfomance Results: 1.8.0_31

$ export JAVA_HOME="`/usr/libexec/java_home -v '1.8.0_31'`"

$ java -version

java version "1.8.0_31"
Java(TM) SE Runtime Environment (build 1.8.0_31-b13)
Java HotSpot(TM) 64-Bit Server VM (build 25.31-b07, mixed mode)

$ java ReactMicroBenchmark

Run #1: 215.378031 ms

...

Run #10: 34.502135 ms

...

Run #20: 27.313378 ms

...

Run #40: 19.903963 ms

...

Run #80: 14.924068 ms

...

Run #100: 12.951395 ms

...

Run #200: 4.961752 ms

...

Run #500: 3.96276 ms

...

Run #1000: 0.890468 ms

...

Run #10000: 0.507431 ms

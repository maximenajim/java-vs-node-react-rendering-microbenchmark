# nashorn-react-microbenchmark
micro-benchmark of Java 8 nashorn - server-side rendering of a react component

## Compiling and Running
Compiling ReactMicroBenchmark
```
$ javac ReactMicroBenchmark.java
```
Running ReactMicroBenchmark
```
$ java ReactMicroBenchmark
```
Running ReactMicroBenchmark with specific number of executions, e.g.
```
$ java ReactMicroBenchmark 100
```
Running ReactMicroBenchmark with specific number of executions and number of comments in react comment box, e.g.
```
$ java ReactMicroBenchmark 100 10
```

## Perfomance Results
Output from running ReactMicroBenchmark.  *With version 1.8.0_31 react rendering time is below 1ms after 1000 iterations.  With  versions 1.8.0_40 and later the Java HotSpot Performance Engine is not able to optimize beyond ~20 ms rendering time.*

### Running with Java 1.8.0_31
```
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
```

### Running with Java 1.8.0_40
```
$ export JAVA_HOME="`/usr/libexec/java_home -v '1.8.0_40'`"
$ java -version
java version "1.8.0_40"
Java(TM) SE Runtime Environment (build 1.8.0_40-b27)
Java HotSpot(TM) 64-Bit Server VM (build 25.40-b25, mixed mode)

$ java ReactMicroBenchmark
Run #1: 365.992715 ms
...
Run #10: 21.430693 ms
...
Run #20: 22.498651 ms
...
Run #40: 31.285618 ms
...
Run #80: 20.096194 ms
...
Run #100: 23.383296 ms
...
Run #200: 29.102352 ms
...
Run #500: 21.667297 ms
...
Run #1000: 23.337641 ms
...
Run #10000: 25.088656 ms
```

### Running with Java 1.8.0_60
```
$ export JAVA_HOME="`/usr/libexec/java_home -v '1.8.0_60'`"
$ java -version
java version "1.8.0_60"
Java(TM) SE Runtime Environment (build 1.8.0_60-b27)
Java HotSpot(TM) 64-Bit Server VM (build 25.60-b23, mixed mode)

$ java ReactMicroBenchmark
Run #1: 337.751617 ms
...
Run #10: 33.046045 ms
...
Run #40: 24.244118 ms
...
Run #81: 23.548716 ms
...
Run #100: 21.439647 ms
...
Run #200: 21.322487 ms
...
Run #500: 22.643768 ms
...
Run #1000: 25.085296 ms
...
Run #10000: 25.757224 ms
```

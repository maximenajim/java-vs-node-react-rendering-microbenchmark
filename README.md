# java-vs-node-react-rendering-microbenchmark
Server-side rendering of a simple react component - Java 8's nashorn vs node.js microbenchmark

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
Performance comparing Nashorn with node.js. Nashorn takes a little longer to warm-up but after 10000 iterations it matches node.js performance.

### Java 8 - Nashorn
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

### Node.js - V8
```
$ node --version
v0.12.7

$ node ReactMicroBenchmark.js
Run #1: 9.884367000000054 ms
...
Run #10: 0.8311479999999847 ms
...
Run #20: 0.6488820000000146 ms
...
Run #40: 0.5726009999999633 ms
...
Run #80: 0.536360000000002 ms
...
Run #100: 0.507251999999994 ms
...
Run #1000: 0.4652369999999948 ms
...
Run #10000: 0.4628829999999766 ms
```

### Running the renderServer test
```
$ node test/renderServer.test.js
```
### Machine Info
These tests were run using a MacBook Pro (Retina, 15-inch, Mid 2014) with 2.8 GHz Intel Core i7 processor and 16 GB 1600 MHz DDR3 of memory.

### *Note: newer versions of Java 8*
With version 1.8.0_31 react rendering time is below 1ms after 1000 iterations.  With  versions 1.8.0_40 and later the Java HotSpot Performance Engine is not able to optimize beyond ~20 ms rendering time.  *I've also done the same comparison using
([jhm](http://openjdk.java.net/projects/code-tools/jmh)) tool: [nashorn-react-jmh-microbenchmark](https://github.com/maximenajim/nashorn-react-jmh-microbenchmark).*

*Java team is fixing the react.js performance regression:* https://bugs.openjdk.java.net/browse/JDK-8134403

#### Running with Java 1.8.0_40
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

#### Running with Java 1.8.0_60
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

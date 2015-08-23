import jdk.nashorn.api.scripting.NashornScriptEngineFactory;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ReactMicroBenchmark {

    static final int DEFAULT_NUM_RUNS = 10000;
    static final int DEFAULT_NUM_COMMENTS = 10;

    public static void main(String[] args) {
        int NUM_RUNES = numOfRunes(args);
        int NUM_COMMENTS = numOfComments(args);
        Invocable nashornScriptEngine = (Invocable) setupNashornScriptEngine();
        for (int i = 0; i < NUM_RUNES; ++i) {
            List<Comment> comments = generateComments(NUM_COMMENTS);

            long start = System.nanoTime();
            try {
                Object html = nashornScriptEngine.invokeFunction("renderServer", comments);
                String.valueOf(html);
            } catch (Exception e) {
                throw new IllegalStateException("failed to render react component", e);
            }
            long stop = System.nanoTime();
            System.out.println("Run #" + (i + 1) + ": " + ((stop - start) / 1e6) + " ms");
        }

    }

    private static Reader read(String path) {
        InputStream in = ReactMicroBenchmark.class.getClassLoader().getResourceAsStream(path);
        return new InputStreamReader(in);
    }

    private static int numOfComments(String[] args) {
        int NUM_COMMENTS = DEFAULT_NUM_COMMENTS;
        if (args.length == 2 && args[1] != null) {
            try {
                NUM_COMMENTS = Integer.parseInt(args[1]);
            } catch (NumberFormatException e) {
            }
        }
        return NUM_COMMENTS;
    }

    private static int numOfRunes(String[] args) {
        int NUM_RUNES = DEFAULT_NUM_RUNS;
        if (args.length >= 1 && args[0] != null) {
            try {
                NUM_RUNES = Integer.parseInt(args[0]);
            } catch (NumberFormatException e) {
            }
        }
        return NUM_RUNES;
    }

    private static List<Comment> generateComments(int NUM_COMMENTS) {
        Random random = new Random();
        List<Comment> comments = new ArrayList<>();
        for (int j = 0; j < NUM_COMMENTS; ++j) {
            comments.add(new Comment("Name " + random.nextInt(), "This is comment #" + random.nextInt() + "."));
        }
        return comments;
    }

    private static ScriptEngine setupNashornScriptEngine() throws RuntimeException {
        NashornScriptEngineFactory factory = new NashornScriptEngineFactory();
        ScriptEngine engine = factory.getScriptEngine(new String[]{"--optimistic-types=true"});
        try {
            engine.eval(read("js/nashorn-polyfill.js"));
            engine.eval(read("js/react.js"));
            engine.eval(read("js/commentBox.js"));
        } catch (ScriptException e) {
            throw new RuntimeException(e);
        }
        return engine;
    }

    public static class Comment {
        private String author;
        private String text;

        public Comment(String author, String text) {
            this.author = author;
            this.text = text;
        }

        public String getAuthor() {
            return author;
        }

        public String getText() {
            return text;
        }
    }

}
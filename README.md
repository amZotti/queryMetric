<h1>Query Metric</h1>
<p>Query Metric is a RESTful API which accepts a query string via GET request
parameters and translates it into a MySQL query to enable users to perform
advanced MySQL queries via HTTP. </p>

<h2>System Architecture</h2>
<p>When the server receives a GET request it extracts the parameters out of the
query string that the user inserted as a URL. The parameters are then passed
into <code>processRequest</code>, where validations occur. Validations will
detect if the user inserted improper parameters and return 'bad query' if that
is the case. Otherwise, the <code>modelAdapter</code> will translate the
parameters in an MySQL query and finally return the results to the user. This
system makes heavy use of promises to deal with the asynchronous nature of using
HTTP and database queries. More specifically, Query Metric uses promises for
increased readability and modularity.</p>

<h2>Parameter Structure</h2>
<p>Query Metric accepts 5 parameters: </p>
<ol>
  <li>filter</li>
    <ul>
      <li><code>filter</code> represents the <code>WHERE</code> condition</li>
      <li><code>filter</code> is the attribute in any given <code>metric</code object that is compared against</li>
    </ul>
  <li>range</li>
    <ul>
      <li><code>after</code></li>
      <li><code>before</code></li>
    </ul>
  <li>date</li>
    <ul>
      <li>The start date represents the beginning of the metric calculation. It
      is in a custom format (JohnTime) that represents the number of days since Jan 1,
      2009.</li>
    </ul>
  <li>aggregate</li>
    <ul>
      <li><code>sum</code></li>
      <li><code>count</code></li>
      <li><code>avg</code></li>
    </ul>
  <li>aggregateTarget</li>
    <ul>
      <li><code>aggregateTarget</code> represents the <code>SELECT</code> condition</li>
      <li><code>aggregateTarget</code> is the attribute which should be returned</li>
      <li><code>aggregateTarget</code> is what the <code>aggregate</code> function is applied to</li>
    </ul>
</ol>

<h3>Example URL</h3>
<code>http://localhost:3000/start_date/before/2028/count/value</code>

<h3>Object Representation of URL</h3>
<pre>
  {
    filter: 'start_date',
    range: 'before',
    date: '2028',
    aggregate: 'count',
    aggregateTarget: 'value'
  }
</pre>

<h2>Technology Stack</h2>
<ul>
  <li>Nodejs</li>
  <li>Express</li>
  <li>MySQL</li>
</ul>

<!DOCTYPE html>
<html>
<head>
<title>Student Dashboard</title>

<style>
body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    background-color: #f4f4f9;
}

.dashboard {
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 8px;
    padding: 25px;
    background: white;
    box-shadow: 0 5px 15px rgba(105, 40, 236, 0.3);
    width: 600px;
}

h2 {
    text-align: center;
    color: #6928ec;
}

form {
    display: flex;
    gap: 10px;
}

select, button {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    cursor: pointer;
    background: #6928ec;
    color: white;
    border: none;
}

button:hover {
    background-color: #4e21a8;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background: #6928ec;
    color: white;
}

.count-box {
    margin-top: 10px;
    padding: 10px;
    background: #f4f0ff;
    border-radius: 6px;
}
</style>
</head>

<body>

<div class="dashboard">

<h2>Student Dashboard</h2>

<form method="GET">
    <select name="department">
        <option value="">All Departments</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Electronics">Electronics</option>
        <option value="Mechanical">Mechanical</option>
    </select>

    <select name="sort">
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="date">Date of Birth</option>
    </select>

    <button type="submit">Apply</button>
</form>

<table>
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Department</th>
    <th>DOB</th>
</tr>

<?php while($row = $result->fetch_assoc()) { ?>
<tr>
    <td><?php echo $row['id']; ?></td>
    <td><?php echo $row['name']; ?></td>
    <td><?php echo $row['email']; ?></td>
    <td><?php echo $row['department']; ?></td>
    <td><?php echo $row['dob']; ?></td>
</tr>
<?php } ?>
</table>

<div class="count-box">
    <h4>Students per Department</h4>
    <?php while($count = $countResult->fetch_assoc()) { ?>
        <p><?php echo $count['department']; ?> : <?php echo $count['total']; ?></p>
    <?php } ?>
</div>

</div>

</body>
</html>

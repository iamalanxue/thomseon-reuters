<img src="https://habrastorage.org/webt/vc/3r/cw/vc3rcwkzc1ddo7s4tux1ys-us0i.png" />

**Setting up Environment**
1. cd into the `backend` folder directory
2. `conda create --name myenv --file spec-file.txt`
3. `conda install --name myenv --file spec-file.txt`
4. `conda activate myenv `
5. go into directory and run `pip install -r requirements.txt`
6. "C:\Users\alanx\anaconda3\envs\myenv\lib\site-packages\catalyst\utils\metrics\accuracy.py" in this file for my path on line 53 change the `view()` method into `reshape()` method
7. Now you can run the server by running the command `flask run`

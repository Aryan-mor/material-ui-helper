#MaterialUIHelper library\
If you want turn off logger(gLog,gError, ...) you can use this code=>
Add "set REACT_APP_MATERIAL_HELPER_LOGGER=false" on your package.json script;
Example:
{
  "scripts": {
    "build":"set REACT_APP_MATERIAL_HELPER_LOGGER=false react-scripts build"
  }
}
